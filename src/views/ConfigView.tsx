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
}

export default function ConfigView({ mode, onStart }: ConfigViewProps) {
  const { t } = useLanguage();
  const modeName = t.home.modes[mode] || mode.toUpperCase();
  

  const [currentConfig, setCurrentConfig] = useState<TabataSettings | EmomSettings | AmrapSettings | ForTimeSettings | PaceSettings | CustomSettings | any>(null);

  const renderForm = () => {
    switch (mode) {
      case 'tabata':
        return <TabataForm onChange={setCurrentConfig} />;
      case 'emom':
        return <EmomForm onChange={setCurrentConfig} />;
      case 'amrap':
        return <AmrapForm onChange={setCurrentConfig} />;
      case 'fortime':
        return <ForTimeForm onChange={setCurrentConfig} />;
      case 'pacer': 
        return <PaceForm onChange={setCurrentConfig} />;
      case 'custom': 
        return <CustomForm onChange={setCurrentConfig} />;
      default:
        return <p className="text-on-surface-variant font-label-caps mt-8">Configuración para {modeName} en desarrollo...</p>;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-section-gap pb-[100px]">
     
        <section className="flex flex-col gap-4">
          <h2 className="font-label-caps text-[14px] text-primary-fixed opacity-70 tracking-widest">
            {modeName} {t.config.configuration}
          </h2>
        </section>

        {/* Inyección Dinámica del Formulario */}
        {renderForm()}

       
      </div>

      <div className="fixed bottom-[80px] left-0 w-full z-50">
        <div className="h-12 bg-gradient-to-t from-background to-transparent w-full"></div>
        <div className="bg-background px-margin-safe pb-margin-safe pt-2">
          <button 
            onClick={() => onStart(currentConfig)}
            className="w-full bg-primary text-background font-headline-md text-xl h-touch-target-min flex items-center justify-center space-x-4 glow-heavy active:scale-95 transition-all tracking-widest"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            <span>{t.config.startWorkout}</span>
          </button>
        </div>
      </div>
    </>
  );
}