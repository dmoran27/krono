interface Props {
    text: string;
    onClick: () => void;
  }
  
  export default function AddButton({ text, onClick }: Props) {
    return (
      <button onClick={onClick} className="w-full py-4 border-2 border-dashed border-primary/40 flex items-center justify-center space-x-2 active:bg-primary/10 transition-none">
        <span className="material-symbols-outlined">add</span>
        <span className="font-label-caps tracking-widest">{text}</span>
      </button>
    );
  }