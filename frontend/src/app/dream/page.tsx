import PageAtmosphere from '@/components/PageAtmosphere';
import DreamClient from '@/components/DreamClient';

export default function DreamPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">
        <DreamClient />
      </div>
    </div>
  );
}
