import { columns, Payment } from './columns';
import { DataTable } from './data-table';
import { TypographyH4 } from '../ui/typography';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'incomplete',
      email: 'm@example.com',
    },
    {
      id: '728ed23f',
      amount: 50,
      status: 'completed',
      email: 'n@example.com',
    },
    {
      id: '728ed11f',
      amount: 25,
      status: 'overdue',
      email: 'o@example.com',
    },
    {
      id: '668ed11f',
      amount: 15,
      status: 'completed',
      email: 'p@example.com',
    },
    // ...
  ];
}

const TaskTable = async () => {
  const data = await getData();
  return (
    <div className='shadow-sm p-4 rounded-lg'>
      <TypographyH4>Tasks</TypographyH4>
      <div className='container mt-4 mx-auto'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TaskTable;
