import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EmomSettings, EmomExercise } from '../../types';

interface Props {
  onChange: (settings: EmomSettings) => void;
}

export default function EmomForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  // Estados Iniciales
  const [preparationTime, setPreparationTime] = useState(10);
  const [workWindow, setWorkWindow] = useState(60); 
  const [rounds, setRounds] = useState(10);
  
  // Ahora exercises es un array de objetos
  const [exercises, setExercises] = useState<EmomExercise[]>([
    { name: '', unilateral: false }
  ]);

  useEffect(() => {
    onChange({ 
      preparationTime, workWindow, rounds, exercises
    });
  }, [preparationTime, workWindow, rounds, exercises, onChange]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', unilateral: false }]);
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

  // UI Components reutilizados
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
      
      {/* SECCIÓN GLOBAL */}
      <section className="space-y-gutter">
        <LargeControl 
          label={t.config.preparationTime} 
          value={preparationTime} 
          setter={setPreparationTime} 
          step={5} 
          suffix="s" 
        />
        
        {/* BLOQUE PRINCIPAL EMOM */}
        <div className="grid grid-cols-2 gap-px border-2 border-primary bg-primary">
          <div className="bg-background p-gutter flex flex-col items-center">
            <span className="font-label-caps tracking-widest text-primary/60 mb-2 text-center">{t.config.every}</span>
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setWorkWindow(Math.max(10, workWindow - 10))} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">remove</span></button>
              <span className="font-headline-md text-headline-md text-primary">{workWindow}s</span>
              <button onClick={() => setWorkWindow(workWindow + 10)} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
          
          <div className="bg-background p-gutter flex flex-col items-center">
            <span className="font-label-caps tracking-widest text-primary/60 mb-2 text-center">{t.config.roundsTotal}</span>
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setRounds(Math.max(1, rounds - 1))} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">remove</span></button>
              <span className="font-headline-md text-headline-md text-primary">{rounds.toString().padStart(2, '0')}</span>
              <button onClick={() => setRounds(rounds + 1)} className="text-primary active:scale-90 p-2"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE EJERCICIOS */}
      <section className="space-y-8">
        <article className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest p-gutter pt-8 space-y-gutter">
          
          <div className="space-y-4">
            <span className="font-label-caps tracking-widest text-primary/60">{t.config.alternatingExercises}</span>
            <div className="space-y-2">
              {exercises.map((exercise, index) => (
                <div key={index} className="border-b-2 border-primary/40 flex items-center justify-between py-2 focus-within:border-primary transition-colors">
                  
                  {/* Número de secuencia */}
                  <span className="font-label-caps text-primary/40 mr-2 w-4 text-center">
                    {index + 1}
                  </span>
                  
                  {/* Input del Ejercicio */}
                  <input 
                    type="text" 
                    value={exercise.name} 
                    onChange={(e) => updateExerciseName(index, e.target.value)}
                    placeholder={`EJ: MIN ${index + 1}`}
                    className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0 ml-2"
                  />
                  
                  {/* Mini-Toggle Unilateral (L/R) por ejercicio */}
                  <button 
                    onClick={() => toggleUnilateral(index)}
                    title={t.config.unilateralMode}
                    className={`flex items-center justify-center px-2 py-1 border transition-colors ml-2 mr-2 active:scale-90 ${
                      exercise.unilateral ? 'border-primary text-primary bg-primary/10' : 'border-primary/20 text-primary/40'
                    }`}
                  >
                    <span className="font-label-caps text-[10px] tracking-widest">{t.config.unilateralToggle}</span>
                  </button>

                  <span className="material-symbols-outlined text-primary/40">drag_handle</span>
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