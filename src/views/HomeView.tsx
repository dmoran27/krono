import ProtocolCard from '../components/ui/ProtocolCard';
import { ViewProps, TrainingMode } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function HomeView({ onSelectMode }: ViewProps) {
  const { t } = useLanguage();

  const modesConfig: { id: TrainingMode; icon: string; label: string }[] = [
    { id: 'tabata', icon: 'timer', label: t.home?.modes?.tabata || 'TABATA' },
    { id: 'emom', icon: 'update', label: t.home?.modes?.emom || 'EMOM' },
    { id: 'amrap', icon: 'loop', label: t.home?.modes?.amrap || 'AMRAP' },
    { id: 'fortime', icon: 'shutter_speed', label: t.home?.modes?.fortime || 'FOR TIME' },
    { id: 'custom', icon: 'edit_note', label: t.home?.modes?.custom || 'CUSTOM' },
    { id: 'pacer', icon: 'directions_run', label: t.home?.modes?.pacer || 'PACER' },
  ];

  return (
    <>
      {/* =========================================
          VERSIÓN MÓVIL (Oculta en Desktop)
          ========================================= */}
      <div className="md:hidden flex flex-col w-full pt-4">
      <div className="space-y-1 md:space-y-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 mb-4">
          
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-primary uppercase font-bold leading-tight md:leading-none">
            {t.home?.protocol || 'SELECT TRAINING PROTOCOL'}
          </h2>
          
          <p className="font-label-caps text-on-surface-variant text-xs md:text-sm">
            {t.home?.selectProtocol || 'SELECT TRAINING PROTOCOL'}
          </p>

        </div>

        {/* Cuadrícula 2x2 para móvil usando tu lógica de mapeo */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {modesConfig.map((m) => (
            <ProtocolCard 
              key={m.id}
              layout="mobile"
              title={m.label}
              icon={m.icon}
              onClick={() => onSelectMode(m.id)}
            />
          ))}
        </div>

      </div>

      {/* =========================================
          VERSIÓN DESKTOP (Oculta en Móvil)
          ========================================= */}
      <div className="hidden md:flex flex-col w-full space-y-12">
        {/* Contenedor del título con padding responsive */}
        <div className="space-y-1 md:space-y-2 border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 mb-4">
          
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-primary uppercase font-bold leading-tight md:leading-none">
            {t.home?.protocol || 'SELECT TRAINING PROTOCOL'}
          </h2>
          
          <p className="font-label-caps text-on-surface-variant text-xs md:text-sm">
            {t.home?.selectProtocol || 'SELECT TRAINING PROTOCOL'}
          </p>

        </div>

        <div className="grid grid-cols-4 gap-4">
          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-2 row-span-2"
            layout="featured"
            number={t.home?.protocol + " 01"}
            title={t.home?.modes?.tabata || 'TABATA'}
            icon="timer"
            description={t.protocols?.tabataDesc || 'High-intensity interval training. 20 seconds work, 10 seconds rest. 8 rounds of technical precision.'}
            stats={[
              { label: t.protocols?.stats?.totalTime, value: '04:00' },
              { label: t.protocols?.stats?.intensity, value: t.protocols?.stats?.max }
            ]}
            onClick={() => onSelectMode('tabata')}
          />

          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-1"
            layout="standard"
            number={t.home?.protocol + " 02"}
            title={t.home?.modes?.emom || 'EMOM'}
            icon="update"
            description={t.protocols?.emomDesc || 'Every Minute on the Minute. Volume-based mastery.'}
            onClick={() => onSelectMode('emom')}
          />

          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-1"
            layout="standard"
            number={t.home?.protocol + " 03"}
            title={t.home?.modes?.amrap || 'AMRAP'}
            icon="loop"
            description={t.protocols?.amrapDesc || 'As Many Rounds As Possible. Pushing the threshold.'}
            onClick={() => onSelectMode('amrap')}
          />

          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-1"
            layout="standard"
            number={t.home?.protocol + " 04"}
            title={t.home?.modes?.fortime || 'FOR TIME'}
            icon="shutter_speed"
            description={t.protocols?.fortimeDesc || 'Complete the designated work as fast as possible.'}
            onClick={() => onSelectMode('fortime')}
          />

          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-1"
            layout="standard"
            number={t.home?.protocol + " 05"}
            title={t.home?.modes?.pacer || 'PACER'}
            icon="directions_run"
            description={t.protocols?.pacerDesc || 'Beat the target cadence. Sustained output.'}
            onClick={() => onSelectMode('pacer')}
          />

          <ProtocolCard
            actionText={t.home?.configure || 'CONFIGURE'}
            className="col-span-4"
            layout="wide"
            number={t.home?.protocol + " 06"}
            title={t.home?.modes?.custom || 'CUSTOM'}
            icon="edit_note"
            description={t.protocols?.customDesc || 'Build complex interval sequences from scratch.'}
            onClick={() => onSelectMode('custom')}
          />
        </div>

       
      </div>
      </>
  );
}