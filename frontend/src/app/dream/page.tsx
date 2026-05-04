import PageAtmosphere from '@/components/PageAtmosphere';
import DreamClient from '@/components/DreamClient';

export default function DreamPage() {
  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">
        <DreamClient />
      </div>
    </div>
  );
}
