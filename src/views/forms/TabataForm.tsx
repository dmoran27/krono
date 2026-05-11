import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TabataSettings, TabataCycle } from '../../types';

interface Props {
  onChange: (settings: TabataSettings) => void;
}

export default function TabataForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  // Configuración Global
  const [preparationTime, setPreparationTime] = useState(10);
  const [cycles, setCycles] = useState(1);
  const [cycleRestTime, setCycleRestTime] = useState(60);

  // Configuración por Ciclos 
  const [cycleConfigs, setCycleConfigs] = useState<TabataCycle[]>([
    { workTime: 20, restTime: 10, rounds: 8, exercises: [''], unilateralMode: false, activeRest: '' }
  ]);

  useEffect(() => {
    setCycleConfigs(prev => {
      const newConfigs = [...prev];
      if (cycles > newConfigs.length) {
        const lastCycle = newConfigs[newConfigs.length - 1];
        for (let i = newConfigs.length; i < cycles; i++) {
          // Copiamos la config del último ciclo, pero reseteamos los ejercicios
          newConfigs.push({ ...lastCycle, exercises: [''] });
        }
      } else if (cycles < newConfigs.length) {
        newConfigs.length = cycles;
      }
      return newConfigs;
    });
  }, [cycles]);

  useEffect(() => {
    onChange({ 
      preparationTime, cycles, cycleRestTime, cycleConfigs
    });
  }, [preparationTime, cycles, cycleRestTime, cycleConfigs, onChange]);

  const updateCycleField = <K extends keyof TabataCycle>(cycleIndex: number, field: K, value: TabataCycle[K]) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex] = { ...newConfigs[cycleIndex], [field]: value };
    setCycleConfigs(newConfigs);
  };

  const addExercise = (cycleIndex: number) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex].exercises.push('');
    setCycleConfigs(newConfigs);
  };

  const updateExercise = (cycleIndex: number, exIndex: number, val: string) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex].exercises[exIndex] = val;
    setCycleConfigs(newConfigs);
  };

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

  const CompactControl = ({ label, value, setter, step = 1, min = 0, suffix = '' }: any) => (
    <div className="flex flex-col items-center border border-primary/20 p-2 bg-background">
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
      
      <section className="space-y-gutter">
        <LargeControl label={t.config.preparationTime} value={preparationTime} setter={setPreparationTime} step={5} suffix="s" />
        
        <div className={`grid grid-cols-2 gap-px border-2 transition-colors ${cycles > 1 ? 'border-primary bg-primary' : 'border-primary/20 bg-primary/20'}`}>
          <div className="bg-background p-gutter flex flex-col items-center">
            <span className="font-label-caps tracking-widest text-primary/60 mb-2">{t.config.cycles}</span>
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setCycles(Math.max(1, cycles - 1))} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">remove</span></button>
              <span className="font-headline-md text-headline-md text-primary">{cycles.toString().padStart(2, '0')}</span>
              <button onClick={() => setCycles(cycles + 1)} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
          
          <div className={`bg-background p-gutter flex flex-col items-center transition-opacity ${cycles > 1 ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
            <span className="font-label-caps tracking-widest text-primary/60 mb-2 text-center">{t.config.cycleRest}</span>
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setCycleRestTime(Math.max(0, cycleRestTime - 10))} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">remove</span></button>
              <span className="font-headline-md text-headline-md text-primary">{cycleRestTime}s</span>
              <button onClick={() => setCycleRestTime(cycleRestTime + 10)} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* TARJETAS DE INTERVALO */}
      <section className="space-y-8">
        {cycleConfigs.map((cycle, cycleIndex) => (
          <article key={cycleIndex} className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest relative">
            
            {cycles > 1 && (
              <div className="absolute top-2 right-4">
                <span className="font-label-caps tracking-widest text-primary">INTERVAL {cycleIndex + 1}</span>
              </div>
            )}

            <div className={`p-gutter ${cycles > 1 ? 'pt-12' : 'pt-6'} space-y-gutter`}>
              
              {/* Grid Numérico Adaptativo */}
              <div className="grid grid-cols-3 gap-gutter">
                <CompactControl label={t.config.workTime} value={cycle.workTime} setter={(val: number) => updateCycleField(cycleIndex, 'workTime', val)} step={5} min={5} suffix="s" />
                <CompactControl label={t.config.restTime} value={cycle.restTime} setter={(val: number) => updateCycleField(cycleIndex, 'restTime', val)} step={5} suffix="s" />
                <CompactControl label={t.config.rounds} value={cycle.rounds} setter={(val: number) => updateCycleField(cycleIndex, 'rounds', val)} step={1} min={1} />
              </div>

              {/* Descanso Activo  */}
              <div className="space-y-2 border-2 border-primary/20 p-3 bg-background focus-within:border-primary/60 transition-colors">
                <span className="font-label-caps text-[10px] tracking-widest text-primary/60 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">pause_circle</span>
                  {t.config.activeRest}
                </span>
                <input 
                  type="text" 
                  value={cycle.activeRest} 
                  onChange={(e) => updateCycleField(cycleIndex, 'activeRest', e.target.value)}
                  placeholder={t.config.activeRestPlaceholder}
                  className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0"
                />
              </div>

              {/* Toggle Unilateral */}
              <button 
                onClick={() => updateCycleField(cycleIndex, 'unilateralMode', !cycle.unilateralMode)}
                className={`w-full flex items-center justify-between border-2 p-gutter group active:bg-primary active:text-background transition-none ${cycle.unilateralMode ? 'border-primary bg-primary/5' : 'border-primary/40'}`}
              >
                <span className="font-label-caps tracking-widest">{t.config.unilateralMode}</span>
                <div className={`w-12 h-6 border-2 flex items-center p-1 ${cycle.unilateralMode ? 'border-primary' : 'border-primary/40 group-active:border-background'}`}>
                  <div className={`w-4 h-full transition-transform ${cycle.unilateralMode ? 'bg-primary translate-x-5' : 'bg-primary/40 group-active:bg-background'}`}></div>
                </div>
              </button>

              {/* Secuencia de Ejercicios */}
              <div className="space-y-4">
                <span className="font-label-caps tracking-widest text-primary/60">{t.config.exercisesSequence}</span>
                <div className="space-y-2">
                  {cycle.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="border-b-2 border-primary/40 flex items-center justify-between py-2 focus-within:border-primary transition-colors">
                      <input 
                        type="text" 
                        value={exercise} 
                        onChange={(e) => updateExercise(cycleIndex, exIndex, e.target.value)}
                        placeholder={cycles > 1 ? `EJ: INTERVAL ${cycleIndex + 1} MOVE` : 'EJ: SQUATS'}
                        className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0"
                      />
                      <span className="material-symbols-outlined text-primary/40">drag_handle</span>
                    </div>
                  ))}
                </div>
                
                <button onClick={() => addExercise(cycleIndex)} className="w-full py-4 border-2 border-dashed border-primary/40 flex items-center justify-center space-x-2 active:bg-primary/10 transition-none">
                  <span className="material-symbols-outlined">add</span>
                  <span className="font-label-caps tracking-widest">{t.config.addExercise}</span>
                </button>
              </div>

            </div>
          </article>
        ))}
      </section>

    </div>
  );
}