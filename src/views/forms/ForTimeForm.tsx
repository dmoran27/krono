import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ForTimeSettings } from '../../types';
import Stepper from '../../components/ui/Stepper'; 

interface Props {
  onChange: (settings: ForTimeSettings) => void;
}

export default function ForTimeForm({ onChange }: Props) {
  const { t } = useLanguage();
  
  const [preparationTime, setPreparationTime] = useState(10);
  const [timeCap, setTimeCap] = useState(15);

  useEffect(() => {
    onChange({ preparationTime, timeCap });
  }, [preparationTime, timeCap, onChange]);

  return (
    <div className="flex flex-col gap-section-gap w-full">
      <section className="space-y-gutter">
        
      
        <Stepper 
          label={t.config.preparationTime} 
          value={preparationTime} 
          onChange={setPreparationTime} 
          step={5} 
          suffix="s" 
        />
        
       
        <Stepper 
          label={t.config.timeCap} 
          value={timeCap.toString().padStart(2, '0')} 
          onChange={setTimeCap} 
          min={1}
          suffix="m" 
          highlighted={true} 
        />
        
      </section>
    </div>
  );
}