import { useLanguage } from '../../context/LanguageContext';

interface Props {
  active: boolean;
  onToggle: () => void;
}

export default function UnilateralToggle({ active, onToggle }: Props) {
  const { t } = useLanguage();
  
  return (
    <button 
      onClick={onToggle}
      className={`flex items-center justify-center px-2 py-1 border transition-colors active:scale-90 ${
        active ? 'border-primary text-primary bg-primary/10' : 'border-primary/20 text-primary/40'
      }`}
    >
      <span className="font-label-caps text-[10px] tracking-widest">
        {t.config.unilateralToggle}
      </span>
    </button>
  );
}