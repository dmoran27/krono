import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PaceSettings, PaceExercise } from '../../types';

// Componentes UI
import ListItem from '../../components/ui/ListItem';
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import RowActionGroup from '../../components/ui/RowActionGroup';

interface Props {
  onChange: (settings: PaceSettings) => void;
  initialData?: PaceSettings;
}

export default function PaceForm({ onChange, initialData }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime ??10);
  const [exercises, setExercises] = useState<PaceExercise[]>(initialData?.exercises ??[
    { name: '', reps: 10, timePerRep: 2, unilateral: false }
  ]);

  useEffect(() => {
    onChange({ preparationTime, exercises });
  }, [preparationTime, exercises, onChange]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', reps: 10, timePerRep: 2, unilateral: false }]);
  };

  const toggleUnilateral = (index: number) => {
    const newEx = [...exercises];
    newEx[index].unilateral = !newEx[index].unilateral;
    setExercises(newEx);
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
      
      <section className="space-y-gutter">
        <Stepper 
          label={t.config.preparationTime} 
          value={preparationTime} 
          onChange={setPreparationTime} 
          step={5} 
          suffix="s" 
          icon="timer"
        />
      </section>


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
                <div className="w-full">
                 <div className="flex flex-col xl:flex-row gap-4 items-end lg:items-center justify-end lg:justify-between  w-full">
                  <input 
                    type="text" 
                    value={exercise.name} 
                    onChange={(e) => updateExercise(exIndex, "name",  e.target.value)}
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
                 <div className="w-full pt-4 mt-4 border-t border-outline-variant/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
                    <div className="m-1">
                      <Stepper 
                        label={t.config.reps} 
                        value={exercise.reps} 
                        onChange={(val) => updateExercise(exIndex, 'reps', val)} 
                        min={1} 
                        layout="compact" 
                        icon="cycle"
                      />
                    </div>
                    <div className="m-1">
                        <Stepper 
                          label={t.config.pace} 
                          value={exercise.timePerRep} 
                          onChange={(val) => updateExercise(exIndex, 'timePerRep', val)} 
                          min={1} 
                          suffix="s" 
                          layout="compact" 
                          icon="schedule"
                        />
                      
                    </div>
                </div>
                </div>
                </div>
              </ListItem>
            )}
          />
      </div>
   
    </div>
  );
}