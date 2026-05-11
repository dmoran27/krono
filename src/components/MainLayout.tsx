import { ReactNode } from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: ReactNode;
  onGoHome?: () => void;
}

export default function MainLayout({ children, onGoHome }: MainLayoutProps) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden select-none">
      <TopBar onGoHome={onGoHome} />
      
      <main className="flex-grow pt-[80px] pb-[100px] flex flex-col">
        {children}
      </main>

      <BottomNav onGoHome={onGoHome} />
    </div>
  );
}