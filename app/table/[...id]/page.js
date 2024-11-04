import Table from '@/app/components/Tables/Table/Table';

export default async function page({ params }) {
  const { id } = await params;

  // get order from here do a axios call

  return (
    <div>
      <Table id={id} />
    </div>
  );
}
