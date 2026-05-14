import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabataForm from './forms/TabataForm';
import EmomForm from './forms/EmomForm'; 
import AmrapForm from './forms/AmrapForm';
import ForTimeForm from './forms/ForTimeForm';
import PaceForm from './forms/PaceForm';
import CustomForm from './forms/CustomForm';
import { TrainingMode} from '../types';

interface ConfigViewProps {
  mode: TrainingMode;
  onStart: (configData: any) => void;
  initialData?: any;
}

export default function ConfigView({ mode, onStart, initialData }: ConfigViewProps) {
  const { t } = useLanguage();
  // 1. Creamos una variable segura que nunca sea null (usamos 'custom' como fallback)
  const currentMode = mode || 'custom';

  // 2. Ahora TypeScript sabe que currentMode es un string válido
  const modeName = t.home.modes[currentMode] || currentMode.toUpperCase();

  // 3. Forzamos la llave dinámica para que TS no se asuste buscando en el objeto de traducciones
  const descKey = `${currentMode}Desc` as keyof typeof t.protocols;
  
  const modeDescription = (t.protocols?.[descKey] as string) || "";
  
  const [currentConfig, setCurrentConfig] = useState<any>(null);

  const renderForm = () => {
    switch (mode) {
      case 'tabata': return <TabataForm onChange={setCurrentConfig} initialData={initialData} />;
      case 'emom': return <EmomForm onChange={setCurrentConfig} initialData={initialData} />;
      case 'amrap': return <AmrapForm onChange={setCurrentConfig} initialData={initialData} />;
      case 'fortime': return <ForTimeForm onChange={setCurrentConfig} initialData={initialData} />;
      case 'pacer': return <PaceForm onChange={setCurrentConfig} initialData={initialData} />;
      case 'custom': return <CustomForm onChange={setCurrentConfig} initialData={initialData} />;
      default:
        return (
          <div className="bg-surface border border-outline p-6 mt-4">
             <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-center">
               Configuración para {modeName} en desarrollo...
             </p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col w-full pb-32">
       
       
        <div className="space-y-1 md:space-y-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 mb-4">
          
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-primary uppercase font-bold leading-tight md:leading-none">
            {modeName} 
          </h2>
          
          <p className="font-label-caps text-on-surface-variant text-xs md:text-sm">
          {modeDescription} 
          </p>

        </div>

        {/* Inyección Dinámica del Formulario */}
        <div className="w-full mt-4">
          {renderForm()}
        </div>

      </div>
      <button 
        onClick={() => onStart(currentConfig)}
        className="fixed bottom-[88px] right-6 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          play_arrow
        </span>
      </button>
    </>
  );
}