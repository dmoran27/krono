import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PaceSettings, PaceExercise } from '../../types';

// Componentes UI
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import UnilateralToggle from '../../components/ui/UnilateralToggle';

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

  const removeExercise = (indexToRemove: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, index) => index !== indexToRemove));
    }
  };

  const updateExercise = <K extends keyof PaceExercise>(index: number, field: K, value: PaceExercise[K]) => {
    const newEx = [...exercises];
    newEx[index] = { ...newEx[index], [field]: value };
    setExercises(newEx);
  };

  return (
    <div className="flex flex-col gap-section-gap w-full">
      
      {/* SECCIÓN GLOBAL */}
      <section className="space-y-gutter">
        <Stepper 
          label={t.config.preparationTime} 
          value={preparationTime} 
          onChange={setPreparationTime} 
          step={5} 
          suffix="s" 
        />
      </section>

      {/* SECCIÓN DE EJERCICIOS CON RITMO */}
      <section className="space-y-8">
        <DynamicList 
          title={t.config.exercisesSequence}
          items={exercises}
          onAdd={addExercise}
          addText={t.config.addExercise}
          renderItem={(exercise, index) => (
            
            // CONTENEDOR TIPO "TARJETA" (Reemplaza al ListItem)
            <div key={index} className="border-2 border-primary/40 p-4 bg-background focus-within:border-primary transition-colors flex flex-col gap-4">
              
              {/* CABECERA: Número, Input y Acciones alineadas */}
              <div className="flex items-center justify-between border-b-2 border-primary/10 pb-3">
                
                {/* Lado Izquierdo: Número y Texto */}
                <div className="flex items-center flex-1 min-w-0">
                  <span className="font-label-caps text-primary/40 mr-4 w-4 text-center shrink-0">
                    {index + 1}
                  </span>
                  <input 
                    type="text" 
                    value={exercise.name} 
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    placeholder="EJ: SQUATS"
                    className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0"
                  />
                </div>

                {/* Lado Derecho: Acciones de la fila */}
                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  <div className="border-r-2 border-primary/10 pr-3">
                    <UnilateralToggle 
                      active={exercise.unilateral} 
                      onToggle={() => updateExercise(index, 'unilateral', !exercise.unilateral)} 
                    />
                  </div>
                  
                  <button 
                    onClick={() => removeExercise(index)}
                    disabled={exercises.length === 1}
                    className="p-1 text-primary/40 hover:text-primary active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                  <span className="material-symbols-outlined text-primary/40 cursor-grab active:cursor-grabbing">
                    drag_handle
                  </span>
                </div>
              </div>

              {/* CUERPO: Controles Numéricos */}
              <div className="grid grid-cols-2 gap-4">
                <Stepper 
                  label={t.config.reps} 
                  value={exercise.reps} 
                  onChange={(val) => updateExercise(index, 'reps', val)} 
                  min={1} 
                  layout="compact" 
                />
                <Stepper 
                  label={t.config.pace} 
                  value={exercise.timePerRep} 
                  onChange={(val) => updateExercise(index, 'timePerRep', val)} 
                  min={1} 
                  suffix="s" 
                  layout="compact" 
                />
              </div>

            </div>
          )}
        />
      </section>

    </div>
  );
}