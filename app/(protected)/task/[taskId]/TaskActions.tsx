'use client';

import { useDeleteTask, useUpdateTask } from '@/app/services/tasks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Check, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TaskActions = ({ taskId }: { taskId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLargeScreen } = useBreakpoints();
  const { mutateAsync: updateTask } = useUpdateTask();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const onClickComplete = () => {
    updateTask(
      { payload: undefined, taskId: taskId },
      {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
          router.push(`/dashboard`);
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
      { taskId: taskId },
      {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          queryClient.invalidateQueries({ queryKey: ['task.get-all'] });
          router.push(`/dashboard`);
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
      <div className='space-x-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={isLargeScreen ? 'default' : 'icon-sm'}
              variant={'destructive'}
            >
              <Trash />
            </Button>
          </DialogTrigger>
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
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' onClick={onClickDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          size={isLargeScreen ? 'default' : 'icon-sm'}
          onClick={onClickComplete}
        >
          <Check />
        </Button>
      </div>
    </>
  );
};

export default TaskActions;
