interface Props {
  text: string;
  onClick: () => void;
}

export default function AddButton({ text, onClick }: Props) {
  return (
    <button onClick={onClick} className="w-full p-4 border border-dashed rounded-lg bg-surface border border-outline/20 bg-transparent flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-on-surface-variant hover:bg-surface/50  hover:text-primary hover:border-primary/50 group">
      <span className="material-symbols-outlined transition-colors">add</span>
      <span className="font-label-md text-sm uppercase tracking-widest">
        {text}
      </span>
    </button>
  );
}