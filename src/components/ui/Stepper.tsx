interface Props {
  label: string;
  value: number | string;
  onChange: (newValue: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  highlighted?: boolean;
  layout?: 'full' | 'compact';
}

export default function Stepper({ 
  label, 
  value, 
  onChange, 
  step = 1, 
  min = 0, 
  suffix = '', 
  highlighted = false,
  layout = 'full' 
}: Props) {
  
  const isCompact = layout === 'compact';
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

  // Clases condicionales para el contenedor principal
  const containerClasses = isCompact
    ? "bg-background p-gutter flex flex-col items-center w-full h-full border-2 border-primary/20"
    : highlighted
      ? "flex flex-col items-center justify-center space-y-4 py-12 border-2 border-primary bg-primary/10 w-full"
      : "flex flex-col items-center justify-center space-y-4 py-8 border-2 border-primary/20 bg-background w-full";

  return (
    <div className={containerClasses}>
      
      {/* Etiqueta / Label */}
      <span className={`font-label-caps tracking-widest text-center ${
        isCompact ? 'text-primary/60 mb-2' : (highlighted ? 'text-primary px-4' : 'text-primary/60')
      }`}>
        {label}
      </span>
      
      {/* Contenedor de Botones y Número */}
      <div className={`flex items-center ${isCompact ? 'justify-between w-full' : 'space-x-gutter'}`}>
        
        <button 
          onClick={() => onChange(Math.max(min, numericValue - step))} 
          className={`text-primary flex items-center justify-center active:bg-primary active:text-background transition-none ${
            isCompact ? 'p-2 active:scale-90 border-transparent' : 'w-16 h-16 border-2 border-primary'
          }`}
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        
        <span className={`text-primary text-center ${
          isCompact ? 'font-headline-md text-headline-md' : 'font-display-lg text-[48px] w-24'
        }`}>
          {value}{suffix}
        </span>
        
        <button 
          onClick={() => onChange(numericValue + step)} 
          className={`text-primary flex items-center justify-center active:bg-primary active:text-background transition-none ${
            isCompact ? 'p-2 active:scale-90 border-transparent' : 'w-16 h-16 border-2 border-primary'
          }`}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        
      </div>
    </div>
  );
}