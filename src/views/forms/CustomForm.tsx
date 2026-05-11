// src/views/forms/CustomForm.tsx
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CustomSettings, CustomInterval } from '../../types';

// Componentes UI
import Stepper from '../../components/ui/Stepper';
import DynamicList from '../../components/ui/DynamicList';
import UnilateralToggle from '../../components/ui/UnilateralToggle';

interface Props {
  onChange: (settings: CustomSettings) => void;
}

export default function CustomForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [rounds, setRounds] = useState(1);
  
  const [intervals, setIntervals] = useState<CustomInterval[]>([
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

  const toggleType = (index: number) => {
    const currentType = intervals[index].type;
    updateInterval(index, 'type', currentType === 'work' ? 'rest' : 'work');
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
        
        {/* Stepper unificado con highlight para las Rondas Totales */}
        <Stepper 
          label={t.config.roundsTotal} 
          value={rounds.toString().padStart(2, '0')} 
          onChange={setRounds} 
          min={1} 
          highlighted={true}
        />
      </section>

      {/* SECCIÓN DE INTERVALOS */}
      <section className="space-y-8">
        <DynamicList 
          title={t.config.exercisesSequence}
          items={intervals}
          onAdd={addInterval}
          addText={t.config.addInterval}
          renderItem={(interval, index) => (
            
            // CONTENEDOR TIPO "TARJETA"
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
                    value={interval.name} 
                    onChange={(e) => updateInterval(index, 'name', e.target.value)}
                    placeholder={interval.type === 'rest' ? t.config.rest : `EJ: MOVEMENT`}
                    className="bg-transparent border-none font-headline-md text-lg text-primary placeholder:text-primary/20 uppercase outline-none w-full focus:ring-0 p-0"
                  />
                </div>

                {/* Lado Derecho: Acciones de la fila */}
                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  
                  {/* Botón I/D solo visible si el intervalo es de trabajo */}
                  {interval.type === 'work' && (
                    <div className="border-r-2 border-primary/10 pr-3">
                      <UnilateralToggle 
                        active={interval.unilateral} 
                        onToggle={() => updateInterval(index, 'unilateral', !interval.unilateral)} 
                      />
                    </div>
                  )}
                  
                  <button 
                    onClick={() => removeInterval(index)}
                    disabled={intervals.length === 1}
                    className="p-1 text-primary/40 hover:text-primary active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                  <span className="material-symbols-outlined text-primary/40 cursor-grab active:cursor-grabbing">
                    drag_handle
                  </span>
                </div>
              </div>

              {/* CUERPO: Controles de Tipo y Tiempo */}
              <div className="flex gap-2 w-full">
                
                {/* Botón selector de Tipo (Trabajo/Descanso) */}
                <button 
                  onClick={() => toggleType(index)}
                  className={`flex-1 border-2 flex items-center justify-center font-label-caps text-xs tracking-widest transition-colors active:scale-95 ${
                    interval.type === 'work' 
                      ? 'border-primary bg-primary text-background' 
                      : 'border-primary/20 bg-transparent text-primary/60'
                  }`}
                >
                  {interval.type === 'work' ? t.config.work : t.config.rest}
                </button>

                {/* Stepper de Duración */}
                <div className="flex-1">
                  <Stepper 
                    label={t.config.workTime} 
                    value={interval.duration} 
                    onChange={(val) => updateInterval(index, 'duration', val)} 
                    step={5} 
                    min={5} 
                    suffix="s" 
                    layout="compact" 
                  />
                </div>
                
              </div>

            </div>
          )}
        />
      </section>

    </div>
  );
}