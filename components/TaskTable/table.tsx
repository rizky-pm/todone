'use client';

import { useState } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { TaskWithCategory, useGetTaskQuery } from '@/app/services/tasks';
import { IPaginationMeta } from '@/app/types';

interface IInitialData {
  data: TaskWithCategory[];
  meta: IPaginationMeta;
}

const TaskTableClient = (props: IInitialData) => {
  const { data, meta } = props;

  const [pageIndex, setPageIndex] = useState(1);

  const queryTask = useGetTaskQuery({
    page: pageIndex,
    limit: 10,
    initialData: data,
    meta,
  });

  const tasks = queryTask.data ?? { data, meta };

  return (
    <div className='container mt-4 mx-auto'>
      <DataTable
        columns={columns}
        data={tasks.data}
        meta={tasks.meta}
        onPageChange={(newPageIndex) => setPageIndex(newPageIndex)}
      />
    </div>
  );
};

export default TaskTableClient;
