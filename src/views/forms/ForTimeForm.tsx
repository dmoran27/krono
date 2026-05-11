import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ForTimeSettings } from '../../types';

interface Props {
  onChange: (settings: ForTimeSettings) => void;
}

export default function ForTimeForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  // Estados Iniciales
  const [preparationTime, setPreparationTime] = useState(10);
  const [timeCap, setTimeCap] = useState(15); // 15 minutos por defecto

  useEffect(() => {
    onChange({ 
      preparationTime, timeCap
    });
  }, [preparationTime, timeCap, onChange]);

  // UI Component para el tiempo de preparación
  const LargeControl = ({ label, value, setter, step = 1, min = 0, suffix = '' }: any) => (
    <div className="flex flex-col items-center justify-center space-y-4 py-8 border-2 border-primary/20 bg-background">
      <span className="font-label-caps tracking-widest text-primary/60">{label}</span>
      <div className="flex items-center space-x-gutter">
        <button onClick={() => setter(Math.max(min, value - step))} className="w-16 h-16 border-2 border-primary text-primary flex items-center justify-center active:bg-primary active:text-background transition-none">
          <span className="material-symbols-outlined">remove</span>
        </button>
        <span className="font-display-lg text-[48px] text-primary w-24 text-center">{value}{suffix}</span>
        <button onClick={() => setter(value + step)} className="w-16 h-16 border-2 border-primary text-primary flex items-center justify-center active:bg-primary active:text-background transition-none">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-section-gap w-full">
      
      <section className="space-y-gutter">
        
        <LargeControl 
          label={t.config.preparationTime} 
          value={preparationTime} 
          setter={setPreparationTime} 
          step={5} 
          suffix="s" 
        />
        
        <div className="flex flex-col items-center justify-center space-y-4 py-12 border-2 border-primary bg-primary/10">
          <span className="font-label-caps tracking-widest text-primary text-center px-4">{t.config.timeCap}</span>
          <div className="flex items-center space-x-gutter">
            <button onClick={() => setTimeCap(Math.max(1, timeCap - 1))} className="w-16 h-16 border-2 border-primary text-primary flex items-center justify-center active:bg-primary active:text-background transition-none">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-display-lg text-[48px] text-primary w-24 text-center">{timeCap.toString().padStart(2, '0')}m</span>
            <button onClick={() => setTimeCap(timeCap + 1)} className="w-16 h-16 border-2 border-primary text-primary flex items-center justify-center active:bg-primary active:text-background transition-none">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
        
      </section>

    </div>
  );
}