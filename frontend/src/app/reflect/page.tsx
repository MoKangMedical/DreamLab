import PageAtmosphere from '@/components/PageAtmosphere';
import ReflectClient from '@/components/ReflectClient';

export default function ReflectPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">
        <ReflectClient />
      </div>
    </div>
  );
}
