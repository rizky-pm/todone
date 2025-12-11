'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { taskFormSchema, TypeTaskFormSchema } from './schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGetCategoriesQuery } from '@/app/services/categories';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { PRIORITY_OPTIONS } from '@/app/constants';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';
import DueDatePicker from '@/components/DueDatePicker';
import { useCreateTaskMutation, useUpdateTask } from '@/app/services/tasks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Task } from '@prisma/client';
import { TypographyMuted } from '@/components/ui/typography';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  initialData: Task | null;
}

const TaskForm = ({ initialData }: IProps) => {
  const form = useForm<TypeTaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      categoryId: initialData?.categoryId ?? '',
      priority: initialData?.priority ?? undefined,
      dueDate: initialData?.dueDate ?? undefined,
    },
  });

  const router = useRouter();
  const { isLargeScreen } = useBreakpoints();

  const queryClient = useQueryClient();
  const { mutateAsync: createTask, isPending: creatingTask } =
    useCreateTaskMutation();
  const { mutateAsync: updateTask, isPending: updatingTask } = useUpdateTask();

  const onClickReset = () => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description ?? '',
        categoryId: initialData.categoryId ?? '',
        priority: initialData.priority,
        dueDate: initialData.dueDate,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        categoryId: '',
        priority: undefined,
        dueDate: undefined,
      });
    }
  };

  const onSubmit = (values: TypeTaskFormSchema) => {
    if (initialData) {
      if (!form.formState.isDirty) return;

      updateTask(
        { payload: { ...values }, taskId: initialData.id },
        {
          onSuccess: (data) => {
            toast.success(data.message, {
              duration: 4000,
            });

            router.push('/dashboard');
            queryClient.invalidateQueries({
              queryKey: ['task-get.summary'],
            });
            queryClient.invalidateQueries({
              queryKey: ['task-get.all'],
            });
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
    } else {
      createTask(values, {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          router.push('/dashboard');
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.error;
            toast.error(errorMessage);
            console.error('Error: ', error);
          }
        },
      });
    }
  };

  const { data: categoriesData, isLoading: isGettingCategories } =
    useGetCategoriesQuery();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${isLargeScreen ? 'task-form' : 'space-y-4'}`}
      >
        <div className='t-title'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      form.formState.errors.title?.message ??
                      'Enter task title...'
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='t-description'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    maxLength={255}
                    placeholder={
                      form.formState.errors.description?.message ??
                      'Describe the task in detail...'
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='t-category'>
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between items-center'>
                  <FormLabel>Category</FormLabel>
                  <div
                    onClick={() => {
                      router.push('/category');
                    }}
                  >
                    <TypographyMuted className='cursor-pointer underline'>
                      Manage category
                    </TypographyMuted>
                  </div>
                </div>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder={
                          form.formState.errors.categoryId?.message ??
                          'Select a category'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {isGettingCategories && (
                      <div className='px-2 py-2 text-sm flex items-center gap-2'>
                        <Spinner />
                        Fetching categories...
                      </div>
                    )}

                    {!isGettingCategories &&
                      categoriesData?.data?.length === 0 && (
                        <div className='px-2 py-2 text-sm text-muted-foreground'>
                          No categories available
                        </div>
                      )}

                    {!isGettingCategories &&
                      categoriesData &&
                      categoriesData.data.length > 0 && (
                        <SelectGroup>
                          {categoriesData.data.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              <div className='flex items-center gap-2'>
                                <span
                                  className='w-3 h-3 rounded-full'
                                  style={{ backgroundColor: item.color }}
                                />
                                {item.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className='t-priority'>
          <FormField
            control={form.control}
            name='priority'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder={
                          form.formState.errors.priority?.message ??
                          'Select a priority'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      {PRIORITY_OPTIONS.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className='flex items-center gap-2'>
                            <span
                              className={`w-3 h-3 rounded-full ${
                                priority.label === 'Low' ? 'bg-blue-400' : ''
                              } ${
                                priority.label === 'Medium'
                                  ? 'bg-yellow-400'
                                  : ''
                              } ${
                                priority.label === 'High' ? 'bg-red-400' : ''
                              }`}
                            />
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className='t-due-date'>
          <FormField
            control={form.control}
            name='dueDate'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>Due Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? dayjs(field.value).format('MMM D, YYYY - HH:mm')
                          : form.formState.errors.dueDate?.message ??
                            'Select date & time'}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent
                    className='p-3 space-y-3 flex flex-col items-center'
                    side='bottom'
                  >
                    <DueDatePicker field={field} />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className='t-actions flex justify-end gap-4'>
          <Button
            variant={'outline'}
            type='reset'
            onClick={onClickReset}
            disabled={creatingTask || updatingTask}
          >
            Reset
          </Button>
          <Button type='submit' disabled={creatingTask || updatingTask}>
            {initialData ? 'Edit Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
