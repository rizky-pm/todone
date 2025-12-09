'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
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
import {
  TaskWithCategory,
  useDeleteTask,
  useUpdateTask,
} from '@/app/services/tasks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const Actions = ({ row }: { row: Row<TaskWithCategory> }) => {
  const router = useRouter();
  const task = row.original;

  const queryClient = useQueryClient();
  const { mutateAsync: updateTask } = useUpdateTask();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const onClickViewDetails = () => {
    router.push(`/task/${task.id}`);
  };

  const onClickComplete = () => {
    updateTask(
      { payload: undefined, taskId: task.id },
      {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.error;
            toast.error(errorMessage);
            console.error('Error: ', error);
          }
        },
      }
    );
  };

  const onClickDelete = () => {
    deleteTask(
      { taskId: task.id },
      {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.error;
            toast.error(errorMessage);
            console.error('Error: ', error);
          }
        },
      }
    );
  };

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
          <DropdownMenuItem onClick={onClickViewDetails}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickComplete}>
            {row.original.completedAt
              ? 'Mark as incomplete'
              : 'Mark as complete'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

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
      return <Actions row={row} />;
    },
  },
];
