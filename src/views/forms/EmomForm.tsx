import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EmomSettings, Exercise } from '../../types';

// Componentes UI
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import ListItem from '../../components/ui/ListItem';
import UnilateralToggle from '../../components/ui/UnilateralToggle';

interface Props {
  onChange: (settings: EmomSettings) => void;
}

export default function EmomForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [workWindow, setWorkWindow] = useState(60); 
  const [rounds, setRounds] = useState(10);
  const [exercises, setExercises] = useState<Exercise[]>([{ name: '', unilateral: false }]);

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
        <Stepper label={t.config.preparationTime} value={preparationTime} onChange={setPreparationTime} step={5} suffix="s" />
        <div className="grid grid-cols-2 gap-px border-2 border-primary bg-primary">
          <Stepper label={t.config.every} value={workWindow} onChange={setWorkWindow} step={10} min={10} suffix="s" layout="compact" />
          <Stepper label={t.config.roundsTotal} value={rounds.toString().padStart(2, '0')} onChange={setRounds} min={1} layout="compact" />
        </div>
      </section>

      {/* SECCIÓN DE EJERCICIOS */}
      <section className="space-y-8">
        <DynamicList 
          title={t.config.alternatingExercises}
          items={exercises}
          onAdd={addExercise}
          addText={t.config.addExercise}
          renderItem={(exercise, index) => (
            
            // Usamos nuestro nuevo Wrapper de fila
            <ListItem 
              key={index} 
              index={index} 
              onRemove={() => removeExercise(index)}
              disableRemove={exercises.length === 1} // No dejamos borrar si solo queda 1
            >
              
              {/* Solo metemos lo que varía en el centro */}
              <input 
                type="text" 
                value={exercise.name} 
                onChange={(e) => updateExerciseName(index, e.target.value)}
                placeholder={`EJ: MIN ${index + 1}`}
                className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0 ml-2"
              />
              
              <UnilateralToggle 
                active={exercise.unilateral} 
                onToggle={() => toggleUnilateral(index)} 
              />
              
            </ListItem>
          )}
        />
      </section>

    </div>
  );
}