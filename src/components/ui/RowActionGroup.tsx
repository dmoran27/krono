// src/components/ui/RowActionGroup.tsx
import { useLanguage } from '../../context/LanguageContext';
import { ReactNode } from 'react';

interface RowActionGroupProps {
  active: boolean;
  onToggle: () => void;
  extraAction?: ReactNode;
  onRemove?: () => void;
  disableRemove?: boolean;
  label?: string; 
}

export default function RowActionGroup({
  active,
  onToggle,
  onRemove,
  disableRemove = false,
  extraAction,
  label
}: RowActionGroupProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 align-center">
      {/* Acción Extra */}
      {extraAction && (
        <div className="flex border-r border-outline-variant/30 pr-3 h-6 items-center">
          {extraAction}
        </div>
      )}

      {/* Botón de Toggle Principal */}
      <button
        onClick={onToggle}
        className={`
          flex items-center justify-center px-3 py-1.5 border rounded-lg
          transition-all duration-200 active:scale-95 cursor-pointer
          ${active 
            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(51,102,204,0.1)]' 
            : 'border-outline-variant text-on-surface-variant bg-surface-container-low hover:border-outline hover:text-on-surface'
          }
        `}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-2 transition-all duration-300 ${
          active 
            ? 'bg-primary shadow-[0_0_8px_#3366CC]' 
            : 'bg-outline-variant'
        }`}></span>

        <span className="font-label text-[10px] font-bold uppercase tracking-widest">
          {label || t.config?.RowActionGroup || 'UNILATERAL'}
        </span>
      </button>

      {/* Botón Eliminar */}
      {onRemove && (
        <button
          onClick={onRemove}
          disabled={disableRemove}
          className={`
            p-2 rounded-lg transition-all duration-200 flex items-center justify-center
            ${disableRemove 
              ? 'opacity-20 cursor-not-allowed text-outline' 
              : 'text-on-surface-variant hover:text-error hover:bg-error/10 active:scale-90'
            }
          `}
          title={t.common?.delete || 'Delete'}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 300" }}>
            delete
          </span>
        </button>
      )}
    </div>
  );
}