import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TabataSettings, TabataCycle } from '../../types';

// Componentes UI Reutilizables
import Stepper from '../../components/ui/Stepper';
import ListItem from '../../components/ui/ListItem';
import UnilateralToggle from '../../components/ui/UnilateralToggle';
import DynamicList from '../../components/ui/DynamicList'; 

interface Props {
  onChange: (settings: TabataSettings) => void;
}

export default function TabataForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [cycles, setCycles] = useState(1);
  const [cycleRestTime, setCycleRestTime] = useState(60);

  const [cycleConfigs, setCycleConfigs] = useState<TabataCycle[]>([
    { workTime: 20, restTime: 10, rounds: 8, exercises: [{ name: '', unilateral: false }], activeRest: '' }
  ]);

  useEffect(() => {
    setCycleConfigs(prev => {
      const newConfigs = [...prev];
      if (cycles > newConfigs.length) {
        const lastCycle = newConfigs[newConfigs.length - 1];
        for (let i = newConfigs.length; i < cycles; i++) {
          newConfigs.push({ ...lastCycle, exercises: [{ name: '', unilateral: false }] });
        }
      } else if (cycles < newConfigs.length) {
        newConfigs.length = cycles;
      }
      return newConfigs;
    });
  }, [cycles]);

  useEffect(() => {
    onChange({ preparationTime, cycles, cycleRestTime, cycleConfigs });
  }, [preparationTime, cycles, cycleRestTime, cycleConfigs, onChange]);

  const updateCycleField = <K extends keyof TabataCycle>(cycleIndex: number, field: K, value: TabataCycle[K]) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex] = { ...newConfigs[cycleIndex], [field]: value };
    setCycleConfigs(newConfigs);
  };

  const addExercise = (cycleIndex: number) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex].exercises.push({ name: '', unilateral: false });
    setCycleConfigs(newConfigs);
  };

  const removeExercise = (cycleIndex: number, exIndex: number) => {
    const newConfigs = [...cycleConfigs];
    if (newConfigs[cycleIndex].exercises.length > 1) {
      newConfigs[cycleIndex].exercises.splice(exIndex, 1);
      setCycleConfigs(newConfigs);
    }
  };

  const updateExerciseName = (cycleIndex: number, exIndex: number, val: string) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex].exercises[exIndex].name = val;
    setCycleConfigs(newConfigs);
  };

  const toggleUnilateral = (cycleIndex: number, exIndex: number) => {
    const newConfigs = [...cycleConfigs];
    newConfigs[cycleIndex].exercises[exIndex].unilateral = !newConfigs[cycleIndex].exercises[exIndex].unilateral;
    setCycleConfigs(newConfigs);
  };

  return (
    <div className="flex flex-col gap-section-gap w-full">
      
      {/* SECCIÓN GLOBAL */}
      <section className="space-y-gutter">
        <Stepper label={t.config.preparationTime} value={preparationTime} onChange={setPreparationTime} step={5} suffix="s" />
        
        <div className={`grid grid-cols-2 gap-px border-2 transition-colors ${cycles > 1 ? 'border-primary bg-primary' : 'border-primary/20 bg-primary/20'}`}>
          <Stepper label={t.config.cycles} value={cycles.toString().padStart(2, '0')} onChange={setCycles} min={1} layout="compact" />
          <div className={`transition-opacity ${cycles > 1 ? 'opacity-100' : 'opacity-20 pointer-events-none'} flex flex-col w-full h-full`}>
            <Stepper label={t.config.cycleRest} value={cycleRestTime} onChange={setCycleRestTime} step={10} suffix="s" layout="compact" />
          </div>
        </div>
      </section>

      {/* TARJETAS DE INTERVALO (CICLOS) */}
      <section className="space-y-8">
        {cycleConfigs.map((cycle, cycleIndex) => (
          <article key={cycleIndex} className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest relative">
            
            {cycles > 1 && (
              <div className="absolute top-2 right-4">
                <span className="font-label-caps tracking-widest text-primary">INTERVAL {cycleIndex + 1}</span>
              </div>
            )}

            <div className={`p-gutter ${cycles > 1 ? 'pt-12' : 'pt-6'} space-y-gutter`}>
              
              <div className="grid grid-cols-3 gap-gutter">
                <Stepper label={t.config.workTime} value={cycle.workTime} onChange={(val) => updateCycleField(cycleIndex, 'workTime', val)} step={5} min={5} suffix="s" layout="compact" />
                <Stepper label={t.config.restTime} value={cycle.restTime} onChange={(val) => updateCycleField(cycleIndex, 'restTime', val)} step={5} suffix="s" layout="compact" />
                <Stepper label={t.config.rounds} value={cycle.rounds} onChange={(val) => updateCycleField(cycleIndex, 'rounds', val)} step={1} min={1} layout="compact" />
              </div>

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

              {/* ¡AQUÍ USAMOS DYNAMIC LIST POR CADA CICLO! */}
              <DynamicList 
                title={t.config.exercisesSequence}
                items={cycle.exercises}
                onAdd={() => addExercise(cycleIndex)}
                addText={t.config.addExercise}
                renderItem={(exercise, exIndex) => (
                  <ListItem 
                    key={exIndex} 
                    index={exIndex} 
                    onRemove={() => removeExercise(cycleIndex, exIndex)}
                    disableRemove={cycle.exercises.length === 1}
                  >
                    <input 
                      type="text" 
                      value={exercise.name} 
                      onChange={(e) => updateExerciseName(cycleIndex, exIndex, e.target.value)}
                      placeholder={cycles > 1 ? `EJ: INTERVAL ${cycleIndex + 1} MOVE` : 'EJ: SQUATS'}
                      className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0 ml-2"
                    />
                    <UnilateralToggle 
                      active={exercise.unilateral} 
                      onToggle={() => toggleUnilateral(cycleIndex, exIndex)} 
                    />
                  </ListItem>
                )}
              />

            </div>
          </article>
        ))}
      </section>

    </div>
  );
}