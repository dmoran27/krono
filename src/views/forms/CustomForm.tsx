import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CustomSettings, CustomInterval, CustomIntervalType } from '../../types';

interface Props {
  onChange: (settings: CustomSettings) => void;
}

export default function CustomForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [rounds, setRounds] = useState(1);
  
  // Inicializamos sin IDs
  const [intervals, setIntervals] = useState<CustomInterval[]>([
    { name: '', duration: 30, type: 'work', unilateral: false }
  ]);

  useEffect(() => {
    onChange({ preparationTime, rounds, intervals });
  }, [preparationTime, rounds, intervals, onChange]);

  const addInterval = () => {
    setIntervals([
      ...intervals, 
      { name: '', duration: 20, type: 'work', unilateral: false }
    ]);
  };

  // Ahora eliminamos usando el index
  const removeInterval = (indexToRemove: number) => {
    if (intervals.length > 1) {
      setIntervals(intervals.filter((_, index) => index !== indexToRemove));
    }
  };

  const updateInterval = <K extends keyof CustomInterval>(index: number, field: K, value: CustomInterval[K]) => {
    const newIntervals = [...intervals];
    newIntervals[index] = { ...newIntervals[index], [field]: value };
    setIntervals(newIntervals);
  };

  const toggleType = (index: number) => {
    const currentType = intervals[index].type;
    updateInterval(index, 'type', currentType === 'work' ? 'rest' : 'work');
  };

  // Componentes UI Reutilizables
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

  const CompactControl = ({ label, value, setter, step = 1, min = 1, suffix = '' }: any) => (
    <div className="flex flex-col items-center border border-primary/20 p-2 bg-background/50 w-full">
      <span className="font-label-caps text-[10px] text-primary/60 mb-2 tracking-widest">{label}</span>
      <div className="flex items-center justify-between w-full">
        <button onClick={() => setter(Math.max(min, value - step))} className="text-primary active:scale-90 p-1 flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
        <span className="font-headline-md text-xl text-primary">{value}{suffix}</span>
        <button onClick={() => setter(value + step)} className="text-primary active:scale-90 p-1 flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-section-gap w-full">
      
      {/* SECCIÓN GLOBAL */}
      <section className="space-y-gutter">
        <LargeControl label={t.config.preparationTime} value={preparationTime} setter={setPreparationTime} step={5} suffix="s" />
        
        <div className="border-2 border-primary bg-primary p-gutter flex flex-col items-center">
          <span className="font-label-caps tracking-widest text-background mb-2">{t.config.roundsTotal}</span>
          <div className="flex items-center justify-between w-full bg-background p-2">
            <button onClick={() => setRounds(Math.max(1, rounds - 1))} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">remove</span></button>
            <span className="font-headline-md text-headline-md text-primary">{rounds.toString().padStart(2, '0')}</span>
            <button onClick={() => setRounds(rounds + 1)} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">add</span></button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE INTERVALOS */}
      <section className="space-y-8">
        <article className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest p-gutter pt-8 space-y-gutter">
          
          <div className="space-y-4">
            <span className="font-label-caps tracking-widest text-primary/60">{t.config.exercisesSequence}</span>
            <div className="space-y-4">
              
              {/* Usamos el 'index' como key para mantener la consistencia con tu código anterior */}
              {intervals.map((interval, index) => (
                <div key={index} className={`border-2 p-3 transition-colors ${interval.type === 'rest' ? 'border-primary/20 bg-primary/5' : 'border-primary/40 focus-within:border-primary bg-background'}`}>
                  
                  {/* Fila 1: Nombre, I/D y Eliminar */}
                  <div className="flex items-center justify-between mb-3 border-b-2 border-primary/10 pb-2">
                    <span className="font-label-caps text-primary/40 mr-2 w-4 text-center">{index + 1}</span>
                    <input 
                      type="text" 
                      value={interval.name} 
                      onChange={(e) => updateInterval(index, 'name', e.target.value)}
                      placeholder={interval.type === 'rest' ? t.config.rest : `EJ: MOVEMENT`}
                      className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0 ml-2"
                    />
                    
                    {interval.type === 'work' && (
                      <button 
                        onClick={() => updateInterval(index, 'unilateral', !interval.unilateral)}
                        className={`flex items-center justify-center px-2 py-1 border transition-colors ml-2 mr-2 active:scale-90 ${
                          interval.unilateral ? 'border-primary text-primary bg-primary/10' : 'border-primary/20 text-primary/40'
                        }`}
                      >
                        <span className="font-label-caps text-[10px] tracking-widest">{t.config.unilateralToggle}</span>
                      </button>
                    )}

                    {/* Pasamos el index a la función removeInterval */}
                    <button 
                      onClick={() => removeInterval(index)}
                      className="text-primary/40 hover:text-primary active:scale-90 p-1"
                      disabled={intervals.length === 1}
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  {/* Fila 2: Controles de Tipo y Tiempo */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleType(index)}
                      className={`flex-1 border-2 flex items-center justify-center font-label-caps text-xs tracking-widest transition-colors ${
                        interval.type === 'work' 
                          ? 'border-primary bg-primary text-background' 
                          : 'border-primary/20 bg-transparent text-primary/60'
                      }`}
                    >
                      {interval.type === 'work' ? t.config.work : t.config.rest}
                    </button>

                    <div className="flex-1">
                       <CompactControl 
                        label={t.config.workTime} 
                        value={interval.duration} 
                        setter={(val: number) => updateInterval(index, 'duration', val)} 
                        step={5} 
                        min={5} 
                        suffix="s" 
                      />
                    </div>
                  </div>
                  
                </div>
              ))}

            </div>
            
            <button onClick={addInterval} className="w-full py-4 border-2 border-dashed border-primary/40 flex items-center justify-center space-x-2 active:bg-primary/10 transition-none">
              <span className="material-symbols-outlined">add</span>
              <span className="font-label-caps tracking-widest">{t.config.addInterval}</span>
            </button>
          </div>

        </article>
      </section>

    </div>
  );
}