import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TabataForm from './forms/TabataForm';
import EmomForm from './forms/EmomForm'; 
import AmrapForm from './forms/AmrapForm';
import ForTimeForm from './forms/ForTimeForm';
import PaceForm from './forms/PaceForm';
import CustomForm from './forms/CustomForm';
import { TrainingMode, TabataSettings, EmomSettings, AmrapSettings, ForTimeSettings, PaceSettings, CustomSettings} from '../types';

interface ConfigViewProps {
  mode: TrainingMode;
  onStart: (configData: any) => void;
  initialData?: any; // Añadimos esto
}

export default function ConfigView({ mode, onStart, initialData }: ConfigViewProps) {
  const { t } = useLanguage();
  const modeName = t.home.modes[mode] || mode.toUpperCase();
  
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
       
        <div className="space-y-2 border-l-4 border-primary pl-8 mb-4">
          <h2 className="font-display-lg text-5xl text-primary uppercase font-bold italic">
          {t.config?.configuration || 'CONFIG'} {modeName} 
          </h2>
          <p className="font-label-caps text-on-surface-variant tracking-[0.25em] text-sm">
          {t.config?.description || 'Configure high-intensity interval parameters for peak performance.'}
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