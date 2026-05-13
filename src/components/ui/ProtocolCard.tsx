import React from 'react';

interface Stat {
  label: string;
  value: string;
}

interface ProtocolCardProps {
  number?: string;
  title: string;
  description?: string;
  icon: string;
  layout?: 'featured' | 'standard' | 'wide' | 'mobile';
  stats?: Stat[];
  actionText?: string;
  onClick?: () => void;
  className?: string;
}

export default function ProtocolCard({
  number,
  title,
  description,
  icon,
  layout = 'standard',
  stats,
  actionText = 'CONFIGURE',
  onClick,
  className = ''
}: ProtocolCardProps) {
  
  // ==========================================
  // LAYOUT MÓVIL 
  // ==========================================
  if (layout === 'mobile') {
    return (
      <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center h-[140px] rounded-lg bg-surface border border-outline/20 transition-all duration-200 active:border-primary active:scale-[0.98] group ${className}`}
      >
        <span 
          className="material-symbols-outlined text-[36px] mb-3 text-primary transition-transform group-active:scale-95" 
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
        >
          {icon}
        </span>
        <span className="font-label-caps text-[11px] font-medium tracking-widest uppercase text-on-surface">
          {title}
        </span>
      </button>
    );
  }

  // ==========================================
  // LAYOUTS DESKTOP 
  // ==========================================
  if (layout === 'featured') {
    return (
      <button 
        onClick={onClick}
        className={`text-left w-full group relative overflow-hidden rounded-lg bg-surface border border-outline/20 p-6 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[400px] hover:border-primary transition-all duration-300 ${className}`}
      >
        <div className="flex justify-between items-start w-full">
          <span className="font-label-caps text-primary tracking-widest text-xs font-bold uppercase">
            {number}
          </span>
          <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <div className="mt-8 md:mt-0 z-10 relative">
          <h3 className="font-display-lg text-4xl md:text-5xl text-on-background mb-4 font-black uppercase">{title}</h3>
          <p className="font-body-md text-on-surface-variant mb-8 max-w-sm">
            {description}
          </p>
          {stats && (
            <div className="grid grid-cols-2 gap-4 border-t border-outline pt-6">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-label-caps text-primary mb-1 uppercase text-[10px] tracking-widest">{stat.label}</p>
                  <p className="font-display-lg text-xl md:text-2xl text-on-background font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-20">
          <span className="material-symbols-outlined text-background">play_arrow</span>
        </div>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none"></div>
      </button>
    );
  }

  if (layout === 'wide') {
    return (
      <button 
        onClick={onClick}
        className={`text-left w-full group rounded-lg bg-surface border border-outline/20 p-6 flex items-center justify-between hover:border-primary transition-all duration-300 ${className}`}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-outline flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <span className="material-symbols-outlined text-on-background group-hover:text-primary transition-colors">
              {icon}
            </span>
          </div>
          <div>
            <h3 className="font-headline-md text-xl md:text-2xl text-on-background font-bold uppercase">{title}</h3>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">{description}</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform shrink-0">
          arrow_forward
        </span>
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`text-left w-full group bg-surface rounded-lg bg-surface border border-outline/20 p-6 flex flex-col justify-between min-h-[180px] hover:border-primary transition-all duration-300 ${className}`}
    >
      <div>
        <span className="font-label-caps text-primary uppercase text-[10px] tracking-widest font-bold">
          {number}
        </span>
        <h3 className="font-headline-md text-2xl text-on-background mt-2 font-bold uppercase">{title}</h3>
        <p className="font-body-md text-on-surface-variant mt-2 text-sm">{description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between w-full">
        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
        <span className="font-label-caps text-primary text-xs tracking-widest uppercase group-hover:underline">
          {actionText}
        </span>
      </div>
    </button>
  );
}