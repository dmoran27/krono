import MenuButton from '../components/MenuButton';
import { TrainingMode, ViewProps } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function HomeView({ onSelectMode }: ViewProps) {
  const { t } = useLanguage();

  const modesConfig: { id: TrainingMode; icon: string; label: string }[] = [
    { id: 'tabata', icon: 'timer', label: t.home.modes.tabata },
    { id: 'emom', icon: 'update', label: t.home.modes.emom },
    { id: 'amrap', icon: 'loop', label: t.home.modes.amrap },
    { id: 'fortime', icon: 'shutter_speed', label: t.home.modes.fortime },
    { id: 'custom', icon: 'edit_note', label: t.home.modes.custom },
    { id: 'pacer', icon: 'directions_run', label: t.home.modes.pacer },
  ];

  return (
    <div>
      <div className="mb-section-gap">
        <p className="font-label-caps text-[14px] font-black text-on-surface-variant mb-unit tracking-widest">
          {t.home.selectProtocol}
        </p>
        <div className="h-1 w-12 bg-primary"></div>
      </div>

      <div className="grid grid-cols-2 gap-gutter w-full">
        {modesConfig.map((m) => (
          <MenuButton 
            key={m.id}
            mode={m.id}
            icon={m.icon} 
            label={m.label} 
            onClick={() => onSelectMode(m.id)} 
          />
        ))}
      </div>
    </div>
  );
}