'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import dayjs from 'dayjs';
import { TaskWithCategory } from '@/app/services/tasks';

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
      <div className='w-10'>
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
      return <p className='truncate w-[300px]'>{row.original.title}</p>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return <p className='truncate w-[400px]'>{row.original.description}</p>;
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
        <div className='flex items-center gap-2 w-[150px]'>
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
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const readableDate = dayjs(row.original.dueDate).format(
        'D MMM YYYY, HH:mm'
      );

      const isOverdue = dayjs(row.original.dueDate).isBefore(dayjs());

      return <p className={`w-[150px]`}>{readableDate}</p>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.original.status.toLocaleLowerCase();

      const isOverdue = dayjs(row.original.dueDate).isBefore(dayjs());

      if (isOverdue) {
        return (
          <Badge className='bg-red-200 text-red-600 capitalize'>Overdue</Badge>
        );
      }

      if (value === 'incomplete') {
        return (
          <Badge className='bg-yellow-200 text-yellow-600 capitalize'>
            {value}
          </Badge>
        );
      } else if (value === 'complete') {
        return (
          <Badge className='bg-green-200 text-green-600 capitalize'>
            {value}
          </Badge>
        );
      }

      return <Badge>{value}</Badge>;
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
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const readableDate = dayjs(row.original.createdAt).format(
        'D MMM YYYY, HH:mm'
      );

      return <p className='w-[150px]'>{readableDate}</p>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const readableDate = dayjs(row.original.updatedAt).format(
        'D MMM YYYY, HH:mm'
      );

      return <p className='truncate w-[150px]'>{readableDate}</p>;
    },
  },
  {
    id: 'actions',
    // header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className='text-right'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
