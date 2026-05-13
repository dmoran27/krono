import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AmrapSettings } from '../../types';
import Stepper from '../../components/ui/Stepper'; 

interface Props {
  onChange: (settings: AmrapSettings) => void;
  initialData?: AmrapSettings;
}

export default function AmrapForm({ onChange, initialData }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime ??  10);
  const [timeCap, setTimeCap] = useState(initialData?.timeCap ?? 15);

  useEffect(() => {
    onChange({ preparationTime, timeCap });
  }, [preparationTime, timeCap, onChange]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
        <div className="m-1">
          <Stepper 
            label={t.config.preparationTime} 
            value={preparationTime} 
            onChange={setPreparationTime} 
            step={5} 
            suffix="s" 
            icon="timer"
          />
          </div>
          <div className="m-1"> 
        
          <Stepper 
            label={t.config.timeCap} 
            value={timeCap.toString().padStart(2, '0')} 
            onChange={setTimeCap} 
            min={1}
            suffix="m" 
            highlighted={true} 
            icon="schedule"
          />
          </div>
        </div>
        
      </div>
  );
}
