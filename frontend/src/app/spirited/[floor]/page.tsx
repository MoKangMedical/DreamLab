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

export default function Page({ params }: { params: { floor: string } }) {
  return <FloorPage params={params} />;
}
