import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PaceSettings, PaceExercise } from '../../types';

interface Props {
  onChange: (settings: PaceSettings) => void;
}

export default function PaceForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [exercises, setExercises] = useState<PaceExercise[]>([
    { name: '', reps: 10, timePerRep: 2, unilateral: false }
  ]);

  useEffect(() => {
    onChange({ preparationTime, exercises });
  }, [preparationTime, exercises, onChange]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', reps: 10, timePerRep: 2, unilateral: false }]);
  };

  const updateExercise = <K extends keyof PaceExercise>(index: number, field: K, value: PaceExercise[K]) => {
    const newEx = [...exercises];
    newEx[index] = { ...newEx[index], [field]: value };
    setExercises(newEx);
  };

  // Componentes UI
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
    <div className="flex flex-col items-center border border-primary/20 p-2 bg-background/50">
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
        <LargeControl 
          label={t.config.preparationTime} 
          value={preparationTime} 
          setter={setPreparationTime} 
          step={5} 
          suffix="s" 
        />
      </section>

      {/* SECCIÓN DE EJERCICIOS CON RITMO */}
      <section className="space-y-8">
        <article className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest p-gutter pt-8 space-y-gutter">
          
          <div className="space-y-4">
            <span className="font-label-caps tracking-widest text-primary/60">{t.config.exercisesSequence}</span>
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="border-2 border-primary/40 p-3 focus-within:border-primary transition-colors bg-background">
                  
                  {/* Fila Superior: Nombre y Toggle */}
                  <div className="flex items-center justify-between mb-3 border-b-2 border-primary/10 pb-2">
                    <span className="font-label-caps text-primary/40 mr-2 w-4 text-center">{index + 1}</span>
                    <input 
                      type="text" 
                      value={exercise.name} 
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                      placeholder={`EJ: SQUATS`}
                      className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0 ml-2"
                    />
                    <button 
                      onClick={() => updateExercise(index, 'unilateral', !exercise.unilateral)}
                      className={`flex items-center justify-center px-2 py-1 border transition-colors ml-2 mr-2 active:scale-90 ${
                        exercise.unilateral ? 'border-primary text-primary bg-primary/10' : 'border-primary/20 text-primary/40'
                      }`}
                    >
                      <span className="font-label-caps text-[10px] tracking-widest">{t.config.unilateralToggle}</span>
                    </button>
                    <span className="material-symbols-outlined text-primary/40">drag_handle</span>
                  </div>

                  {/* Fila Inferior: Controles de Ritmo */}
                  <div className="grid grid-cols-2 gap-2">
                    <CompactControl 
                      label={t.config.reps} 
                      value={exercise.reps} 
                      setter={(val: number) => updateExercise(index, 'reps', val)} 
                      step={1} 
                      min={1} 
                    />
                    <CompactControl 
                      label={t.config.pace} 
                      value={exercise.timePerRep} 
                      setter={(val: number) => updateExercise(index, 'timePerRep', val)} 
                      step={1} 
                      min={1} 
                      suffix="s" 
                    />
                  </div>
                  
                </div>
              ))}
            </div>
            
            <button onClick={addExercise} className="w-full py-4 border-2 border-dashed border-primary/40 flex items-center justify-center space-x-2 active:bg-primary/10 transition-none">
              <span className="material-symbols-outlined">add</span>
              <span className="font-label-caps tracking-widest">{t.config.addExercise}</span>
            </button>
          </div>

        </article>
      </section>

    </div>
  );
}