'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import dayjs from 'dayjs';
import { TaskWithCategory } from '@/app/services/tasks';
import ColumnActions from './column-actions';

export const columns: ColumnDef<TaskWithCategory>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <div className='w-4'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <p className='truncate w-[200px]'>{row.original.title}</p>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.original.category;

      if (!category) {
        return <p>No category</p>;
      }

      return (
        <div className='flex items-center gap-2 w-[100px]'>
          <span
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: category.color }}
          />
          <span>{category.name}</span>
        </div>
      );
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const dueDate = dayjs(row.original.dueDate);
      const completedAt = row.original.completedAt
        ? dayjs(row.original.completedAt)
        : null;
      const now = dayjs();

      if (!completedAt) {
        if (now.isAfter(dueDate)) {
          return (
            <Badge className='bg-red-200 text-red-600 capitalize'>
              Overdue
            </Badge>
          );
        }

        return (
          <Badge className='bg-yellow-200 text-yellow-600 capitalize'>
            In Progress
          </Badge>
        );
      }

      return (
        <Badge className='bg-green-200 text-green-600 capitalize'>
          Completed
        </Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const value = row.original.priority.toLocaleLowerCase();

      if (value === 'low') {
        return (
          <Badge className='bg-blue-200 text-blue-600 capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'medium') {
        return (
          <Badge className='bg-orange-200 text-yellow-700 capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'high') {
        return (
          <Badge className='bg-red-600 text-white capitalize'>{value}</Badge>
        );
      }

      return <Badge>{value}</Badge>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const readableDate = dayjs(row.original.dueDate).format(
        'MMM D, YYYY - HH:mm'
      );
      const dueDate = dayjs(row.original.dueDate);
      const now = dayjs();
      const isOverdue = now.isAfter(dueDate);

      return (
        <p className={`w-[150px] ${isOverdue ? 'text-red-600' : ''}`}>
          {readableDate}
        </p>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ColumnActions row={row} />;
    },
  },
];
