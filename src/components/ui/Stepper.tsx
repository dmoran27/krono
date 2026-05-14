interface Props {
  label: string;
  value: number | string;
  onChange: (newValue: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  highlighted?: boolean;
  layout?: 'full' | 'compact';
  icon?: string;
}

export default function Stepper({ 
  label, 
  value, 
  onChange, 
  step = 1, 
  min = 0, 
  suffix = '', 
  layout = 'full',
  icon
}: Props) {
  
  const isCompact = layout === 'compact';
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      if (suffix === 's') return `00:${val.toString().padStart(2, '0')}`;
      return val.toString().padStart(2, '0');
    }
    return val;
  };

  const displayValue = formatValue(value);

  if (isCompact) {
    // =========================================
    // LAYOUT COMPACTO (Ej: Trabajo / Descanso)
    // =========================================
    return (
      <div className={`bg-surface rounded-lg bg-surface border border-outline/20 p-4`}>
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="material-symbols-outlined text-primary text-lg">{icon}</span>}
          <span className="font-label-lg text-sm uppercase tracking-wider text-on-surface">
            {label}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-numeric-data text-2xl font-bold text-on-surface">
              {displayValue} {suffix}
            </span>
           
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onChange(Math.max(min, numericValue - step))} 
              className="w-10 h-10 bg-surface-container rounded-md  bg-transparent hover:bg-surface/50  hover:text-primary hover:border-primary/50 border border-outline/20 flex items-center justify-center active:scale-90 transition-transform text-on-surface hover:bg-surface-variant"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button 
              onClick={() => onChange(numericValue + step)} 
              className="w-10 h-10 bg-surface-container rounded-md  bg-transparent hover:bg-surface/50  hover:text-primary hover:border-primary/50 border border-outline/20 flex items-center justify-center active:scale-90 transition-transform text-on-surface hover:bg-surface-variant"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // LAYOUT FULL (Ej: Preparación / Ciclos)
  // =========================================
  return (
    <div className={`bg-surface rounded-lg bg-surface border border-outline/20 p-4 flex flex-col justify-between min-h-[140px]`}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="material-symbols-outlined text-primary text-lg">{icon}</span>}
        <span className="font-label-lg text-sm uppercase tracking-wider text-on-surface">
          {label}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <button 
          onClick={() => onChange(Math.max(min, numericValue - step))} 
          className="w-12 h-12 bg-surface-container rounded-lg border border-outline/20  bg-transparent hover:bg-surface/50  hover:text-primary hover:border-primary/50 border border-outline/20 flex items-center justify-center active:scale-90 transition-transform text-on-surface hover:bg-surface-variant rounded-sm"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        
        <span className="font-numeric-data text-3xl font-bold text-primary">
          {displayValue} {suffix}
        </span>
        
        <button 
          onClick={() => onChange(numericValue + step)} 
          className="w-12 h-12 bg-surface-container rounded-lg border border-outline/20  bg-transparent hover:bg-surface/50  hover:text-primary hover:border-primary/50 border border-outline/20 flex items-center justify-center active:scale-90 transition-transform text-on-surface hover:bg-surface-variant rounded-sm"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}