import { ReactNode } from 'react';

interface Props {
  index: number;
  onRemove?: () => void;
  disableRemove?: boolean;
  children: ReactNode;
  extraAction?: ReactNode; 
}

export default function ListItem({ 
  index, 
  onRemove, 
  disableRemove = false, 
  children, 
  extraAction 
}: Props) {
  return (
    <div className="border-b-2 border-primary/40 flex items-center py-2 focus-within:border-primary transition-colors bg-background">
      
      {/* 1. NÚMERO A LA IZQUIERDA */}
      <span className="font-label-caps text-primary/40 mr-2 w-6 text-center shrink-0">
        {index + 1}
      </span>
      
      {/* 2. CONTENIDO (Input y Steppers) */}
      <div className="flex-1 flex items-center min-w-0">
        {children}
      </div>

      {/* 3. ACCIONES A LA DERECHA (Alineadas) */}
      <div className="flex items-center space-x-2 shrink-0 ml-2 pr-2">
        
        {/* Aquí inyectamos el botón I/D si existe */}
        {extraAction && (
          <div className="flex items-center border-r border-primary/20 pr-2 mr-1">
            {extraAction}
          </div>
        )}

        {onRemove && (
          <button 
            onClick={onRemove}
            disabled={disableRemove}
            className={`p-1 transition-colors ${
              disableRemove 
                ? 'text-primary/10 cursor-not-allowed' 
                : 'text-primary/40 hover:text-primary active:scale-90'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
        
        <span className="material-symbols-outlined text-primary/40 cursor-grab active:cursor-grabbing">
          drag_handle
        </span>
      </div>
      
    </div>
  );
}