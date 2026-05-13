import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CustomSettings, CustomInterval } from '../../types';

// Componentes UI
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import RowActionGroup from '../../components/ui/RowActionGroup';
import ListItem from '../../components/ui/ListItem'; // Importamos el nuevo ListItem

interface Props {
  onChange: (settings: CustomSettings) => void;
  initialData?: CustomSettings;
}

export default function CustomForm({ onChange, initialData }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime ?? 10);
  const [rounds, setRounds] = useState(initialData?.rounds ?? 1);
  
  const [intervals, setIntervals] = useState<CustomInterval[]>(initialData?.intervals ??[
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

  return (
    <div className="flex flex-col gap-6 w-full">
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <Stepper 
            label={t.config?.preparationTime || 'TIEMPO DE PREPARACIÓN'} 
            value={preparationTime} 
            onChange={setPreparationTime} 
            step={5} 
            suffix="s" 
            layout="compact" 
            icon="timer"
          />
        </div>
        <div className="">
          <Stepper 
            label={t.config?.roundsTotal || 'RONDAS TOTALES'} 
            value={rounds}
            onChange={setRounds} 
            min={1} 
            step={1}
            layout="compact" 
            icon="cycle" 
          />
        </div>
      </section>

      {/* SECCIÓN DE INTERVALOS */}
      <section className="space-y-6 mt-2">
      <DynamicList 
          title={t.config?.exercisesSequence || 'SECUENCIA PERSONALIZADA'}
          items={intervals}
          onAdd={addInterval}
          addText={t.config?.addInterval || 'AÑADIR INTERVALO'}
          renderItem={(interval, index) => (
            
            <ListItem key={index} index={index}>
              <div className="flex flex-col gap-5 w-full">
                
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between w-full">
                  
                  <input 
                    type="text" 
                    value={interval.name} 
                    onChange={(e) => updateInterval(index, 'name', e.target.value)}
                    placeholder={interval.type === 'rest' ? (t.config?.rest || 'DESCANSO') : 'EJ: SQUATS'}
                    className="flex-1 bg-transparent border-none font-display text-xl text-on-surface placeholder:text-surface-variant/40 uppercase outline-none w-full xl:w-auto focus:ring-0 p-0"
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto shrink-0 mt-2 xl:mt-0">
                    
                    <div className="flex w-full sm:w-auto bg-[#1A1A1A] p-1 rounded-lg border border-outline-variant/20 shrink-0">
                      <button 
                        onClick={() => updateInterval(index, 'type', 'work')}
                        className={`flex-1 sm:w-28 py-1.5 px-4 text-[10px] font-label font-bold tracking-widest uppercase rounded-md transition-all duration-200 ${
                          interval.type === 'work' 
                            ? 'bg-primary text-white shadow-[0_0_10px_rgba(51,102,204,0.2)]' 
                            : 'text-on-surface-variant hover:text-on-surface bg-transparent'
                        }`}
                      >
                        {t.config?.work || 'TRABAJO'}
                      </button>
                      <button 
                        onClick={() => updateInterval(index, 'type', 'rest')}
                        className={`flex-1 sm:w-28 py-1.5 px-4 text-[10px] font-label font-bold tracking-widest uppercase rounded-md transition-all duration-200 ${
                          interval.type === 'rest' 
                            ? 'bg-surface-container-high text-on-surface border border-outline-variant/30 shadow-sm' 
                            : 'text-on-surface-variant hover:text-on-surface bg-transparent'
                        }`}
                      >
                        {t.config?.rest || 'DESCANSO'}
                      </button>
                    </div>

                    <div className="hidden sm:block w-px h-6 bg-outline-variant/30 mx-1"></div>

                    <div className="block sm:hidden w-full h-px bg-outline-variant/10 my-1"></div>

                    <div className="flex items-center justify-end w-full sm:w-auto gap-2">
                      {interval.type === 'work' ? (
                        <RowActionGroup 
                          active={interval.unilateral || false} 
                          onToggle={() => updateInterval(index, 'unilateral', !interval.unilateral)} 
                          onRemove={() => removeInterval(index)}
                          disableRemove={intervals.length === 1}
                        />
                      ) : (
                        <button 
                          onClick={() => removeInterval(index)}
                          disabled={intervals.length === 1}
                          className={`p-2 rounded-lg transition-all flex items-center justify-center ${intervals.length === 1 ? 'opacity-20 cursor-not-allowed text-outline' : 'text-on-surface-variant hover:text-error hover:bg-error/10 active:scale-90'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>delete</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>

                <div className="w-full pt-4 border-t border-outline-variant/10">
                  <Stepper 
                    label={interval.type === 'work' ? (t.config?.workTime || 'TIEMPO DE TRABAJO') : (t.config?.restTime || 'TIEMPO DE DESCANSO')} 
                    value={interval.duration} 
                    onChange={(val) => updateInterval(index, 'duration', val)} 
                    step={5} 
                    min={5} 
                    suffix="s" 
                    layout="compact" 
                    icon={interval.type === 'work' ? 'fitness_center' : 'pause_circle'}
                  />
                </div>

              </div>
            </ListItem>
          )}
        />
      </section>

    </div>
  );
}