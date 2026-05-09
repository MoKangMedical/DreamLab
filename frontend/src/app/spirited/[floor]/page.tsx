import FloorPage from './FloorPage';

export function generateStaticParams() {
  return [
    { floor: '1' },
    { floor: '2' },
    { floor: '3' },
    { floor: '4' },
    { floor: '5' },
  ];
}

export default async function Page({ params }: { params: Promise<{ floor: string }> }) {
  const resolvedParams = await params;
  return <FloorPage params={resolvedParams} />;
}
