import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EmomSettings, Exercise } from '../../types';

// Componentes UI
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import ListItem from '../../components/ui/ListItem';
import RowActionGroup from '../../components/ui/RowActionGroup';

interface Props {
  onChange: (settings: EmomSettings) => void;
  initialData?: EmomSettings;
}

export default function EmomForm({ onChange, initialData }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime ?? 10);
  const [workWindow] = useState(60); 
  const [rounds, setRounds] = useState(initialData?.rounds ?? 10);
  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises ??[{ name: '', unilateral: false }]);

  useEffect(() => {
    onChange({ preparationTime, workWindow, rounds, exercises });
  }, [preparationTime, workWindow, rounds, exercises, onChange]);

  // Funciones de la lista
  const addExercise = () => setExercises([...exercises, { name: '', unilateral: false }]);
  
  const removeExercise = (indexToRemove: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, index) => index !== indexToRemove));
    }
  };

  const updateExerciseName = (index: number, val: string) => {
    const newEx = [...exercises];
    newEx[index].name = val;
    setExercises(newEx);
  };

  const toggleUnilateral = (index: number) => {
    const newEx = [...exercises];
    newEx[index].unilateral = !newEx[index].unilateral;
    setExercises(newEx);
  };

  return (
    <div className="flex flex-col gap-section-gap w-full">
      
      {/* SECCIÓN GLOBAL */}
      <section className="space-y-gutter">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
            <div className="m-1">
              <Stepper label={t.config.preparationTime} value={preparationTime} onChange={setPreparationTime} step={5} suffix="s" layout="compact" icon="timer" />          
            </div>
            <div className="m-1">
              <Stepper label={t.config.roundsTotal} value={rounds.toString().padStart(2, '0')} onChange={setRounds} min={1} layout="compact" icon="cycle" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE EJERCICIOS */}
      <div className="mt-stack-lg">
          <DynamicList 
            title={t.config.exercisesSequence}
            items={exercises}
            onAdd={addExercise}
            addText={t.config.addExercise}
            renderItem={(exercise, exIndex) => (
              <ListItem 
                key={exIndex} 
                index={exIndex} 
                
              >
                 <div className="flex flex-col xl:flex-row gap-4 items-end lg:items-center justify-end lg:justify-between  w-full">                
                  <input 
                    type="text" 
                    value={exercise.name} 
                    onChange={(e) => updateExerciseName(exIndex, e.target.value)}
                    placeholder="EJ: SQUATS"
                    className="bg-transparent border-none font-title-lg text-title-lg text-on-surface placeholder:text-surface-variant uppercase outline-none w-full focus:ring-0 p-0"
                  />

                  <div className="hidden lg:block w-px h-6 bg-outline-variant/30 mx-1"></div>

                  <div className="block lg:hidden w-full h-px bg-outline-variant/10 my-1"></div>
                  
                  <RowActionGroup 
                    active={exercise.unilateral} 
                    onToggle={() => toggleUnilateral(exIndex)} 
                    onRemove={() => removeExercise(exIndex)}
                    disableRemove={exercises.length === 1}
                  />
                  </div>
              </ListItem>
            )}
          />
      </div>

    </div>
  );
}