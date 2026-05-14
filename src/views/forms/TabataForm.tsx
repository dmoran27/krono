import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Componentes UI Reutilizables
import Stepper from '../../components/ui/Stepper';
import ListItem from '../../components/ui/ListItem';
import RowActionGroup from '../../components/ui/RowActionGroup';
import DynamicList from '../../components/ui/DynamicList'; 
import { TabataSettings } from '../../types';

interface Props {
  onChange: (settings: any) => void;
  initialData?: TabataSettings;
}

export default function TabataForm({ onChange, initialData }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime ?? 10);
  const [workTime, setWorkTime] = useState(initialData?.workTime ?? 20);
  const [restTime, setRestTime] = useState(initialData?.restTime ?? 10);
  const [cycles, setCycles] = useState(initialData?.cycles ?? 8); 
  const [activeRest, setActiveRest] = useState(initialData?.activeRest ?? '');
  
  const [exercises, setExercises] = useState(initialData?.exercises ?? [
    { name: '', unilateral: false }
  ]);

  useEffect(() => {
    onChange({ 
      preparationTime, 
      workTime, 
      restTime, 
      cycles, 
      activeRest, 
      exercises 
    });
  }, [preparationTime, workTime, restTime, cycles, activeRest, exercises, onChange]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', unilateral: false }]);
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      const newEx = [...exercises];
      newEx.splice(index, 1);
      setExercises(newEx);
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
    <div className="flex flex-col gap-6 w-full">
      
      {/* SECCIÓN: Preparación */}
      <section className="">
        <Stepper 
          label={t.config?.preparationTime || 'TIEMPO DE PREPARACIÓN'} 
          value={preparationTime} 
          onChange={setPreparationTime} 
          step={5} 
          suffix="s"
          icon="timer"
        />
      </section>

      {/* SECCIÓN: Configuración del Tabata */}
      <section className="space-y-6">
          
          {/* Tiempos y Rondas en Grid - CORREGIDO EL RESPONSIVE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tarjeta 1 */}
            <div className="">
                <Stepper 
                  label={t.config?.workTime || 'TIEMPO DE TRABAJO'} 
                  value={workTime} 
                  onChange={setWorkTime} 
                  step={5} 
                  min={5} 
                  suffix="s" 
                  layout="compact" 
                  icon="schedule"
                />
            </div>
            
            {/* Tarjeta 2 */}
            <div className="">
                <Stepper 
                  label={t.config?.restTime || 'DESCANSO'} 
                  value={restTime} 
                  onChange={setRestTime} 
                  step={5} 
                  suffix="s" 
                  layout="compact" 
                  icon="update"
                />
            </div>
            
            {/* Tarjeta 3 */}
            <div className="">
                <Stepper 
                  label={t.config?.cycles || 'CICLOS (TABATAS)'} 
                  value={cycles} 
                  onChange={setCycles} 
                  step={1} 
                  min={1} 
                  layout="compact" 
                  icon="cycle"
                />
            </div>
          </div>

          {/* Descanso Activo */}
          {restTime > 0 && (
            <div className="rounded-xl bg-surface border border-outline-variant/30 p-5 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(51,102,204,0.1)] transition-all">
              <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[16px]">pause_circle</span>
                {t.config?.activeRest || 'DESCANSO ACTIVO (OPCIONAL)'}
              </span>
              <input 
                type="text" 
                value={activeRest} 
                onChange={(e) => setActiveRest(e.target.value)}
                placeholder={t.config?.activeRestPlaceholder || 'EJ: PLANCHA ISOMÉTRICA'}
                className="bg-transparent border-none font-display text-xl text-primary placeholder:text-surface-variant/50 uppercase outline-none w-full focus:ring-0 p-0"
              />
            </div>
          )}

          {/* Lista de Ejercicios */}
          <div className="mt-6">
              <DynamicList 
                title={t.config?.exercisesSequence || 'SECUENCIA DE EJERCICIOS'}
                items={exercises}
                onAdd={addExercise}
                addText={t.config?.addExercise || 'AÑADIR EJERCICIO'}
                renderItem={(exercise, exIndex) => (
                  <ListItem 
                    key={exIndex} 
                    index={exIndex} 
                  >
                    {/* Contenedor flexible: Columna en móvil, Fila en pantallas grandes */}
                    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center w-full">
                      
                      <input 
                        type="text" 
                        value={exercise.name} 
                        onChange={(e) => updateExerciseName(exIndex, e.target.value)}
                        placeholder="EJ: SQUATS"
                        className="flex-1 bg-transparent border-none font-display text-xl text-on-surface placeholder:text-surface-variant/40 uppercase outline-none w-full focus:ring-0 p-0"
                      />
                      
                      <div className="shrink-0">
                        <RowActionGroup 
                          active={exercise.unilateral} 
                          onToggle={() => toggleUnilateral(exIndex)} 
                          onRemove={() => removeExercise(exIndex)}
                          disableRemove={exercises.length === 1}
                        />
                      </div>
                      
                    </div>
                  </ListItem>
                )}
              />
          </div>
      </section>
    </div>
  );
}