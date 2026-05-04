import PageAtmosphere from '@/components/PageAtmosphere';
import ReflectClient from '@/components/ReflectClient';

export default function ReflectPage() {
  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">
        <ReflectClient />
      </div>
    </div>
  );
}
