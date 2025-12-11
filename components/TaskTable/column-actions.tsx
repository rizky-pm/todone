import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Row } from '@tanstack/react-table';
import {
  TaskWithCategory,
  useDeleteTask,
  useUpdateTask,
} from '@/app/services/tasks';
import { MoreHorizontal } from 'lucide-react';
import { Spinner } from '../ui/spinner';

const ColumnActions = ({ row }: { row: Row<TaskWithCategory> }) => {
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const router = useRouter();
  const task = row.original;

  const queryClient = useQueryClient();
  const { mutateAsync: updateTask, isPending: updatingTask } = useUpdateTask();
  const { mutateAsync: deleteTask, isPending: deletingTask } = useDeleteTask();

  const onClickViewDetails = () => {
    router.push(`/task/${task.id}`);
  };

  const onClickUpdateStatus = () => {
    updateTask(
      { payload: undefined, taskId: task.id },
      {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
          queryClient.invalidateQueries({ queryKey: ['task.get-summary'] });
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

          setIsDialogDeleteOpen(false);
          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
          queryClient.invalidateQueries({ queryKey: ['task.get-summary'] });
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
    <>
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
            <DropdownMenuItem
              onClick={onClickUpdateStatus}
              disabled={updatingTask}
            >
              {updatingTask ? (
                <>
                  <Spinner /> Updating
                </>
              ) : row.original.completedAt ? (
                'Mark as incomplete'
              ) : (
                'Mark as complete'
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={updatingTask}
              onClick={() => {
                setIsDialogDeleteOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={deletingTask}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              onClick={onClickDelete}
              disabled={deletingTask}
            >
              {deletingTask ? (
                <>
                  <Spinner /> Deleting
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ColumnActions;
