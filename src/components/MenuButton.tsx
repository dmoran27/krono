import { MenuButtonProps } from '../types';

export default function MenuButton({ icon, label, onClick }: MenuButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center h-[160px] border-2 border-primary-fixed bg-transparent text-primary-fixed transition-all duration-75 active:bg-primary-fixed active:text-background active:shadow-[0_0_20px_var(--color-primary-fixed)]"
    >
      <span className="material-symbols-outlined text-[48px] mb-2">{icon}</span>
      <span className="font-label-caps text-[14px] font-black tracking-widest">{label}</span>
    </button>
  );
}