import { ReactNode } from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import FooterNav from './FooterNav';

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: 'history' | 'modes' | 'settings'; 
  onNavigate ?: "";
  onGoHome?: () => void;
}

export default function MainLayout({ children, onGoHome, activeTab, onNavigate }: MainLayoutProps) {
  return (
    <div className="bg-background text-on-background font-body overflow-x-hidden min-h-screen flex flex-col">
      <TopBar onGoHome={onGoHome} activeTab={activeTab} onNavigate={onNavigate} />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 md:pb-10">
        {children}
      </main>

      <FooterNav onGoHome={onGoHome} />
      <BottomNav onGoHome={onGoHome} activeTab={activeTab} onNavigate={onNavigate}/>
    </div>
  );
}
