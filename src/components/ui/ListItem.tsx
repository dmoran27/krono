import { ReactNode } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  index: number;
  children: ReactNode;
}

export default function ListItem({ index, children }: Props) {
  const { t } = useLanguage();
  
  return (
    <div className="group flex flex-col sm:flex-row w-full items-stretch overflow-hidden rounded-xl border border-outline-variant/30 bg-surface transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(51,102,204,0.05)]">
     
      <div className="flex sm:w-16 shrink-0 flex-row sm:flex-col items-center justify-between sm:justify-center border-b sm:border-b-0 sm:border-r border-outline-variant/20 bg-surface-container-low/40 group-hover:bg-surface-container-low transition-colors px-4 py-2 sm:p-0">
        
        <span className="font-label text-[10px] sm:text-[9px] font-bold text-on-surface-variant/60 sm:text-on-surface-variant/40 tracking-[0.2em] uppercase sm:mb-1">
          {t.config.listIndexLabel}
        </span>
        <span className="font-display text-xl sm:text-2xl font-bold text-primary leading-none tracking-tighter">
          {(index + 1).toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex-1 p-3 sm:p-5 min-w-0">
        {children}
      </div>
      
    </div>
  );
}