import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { formCategorySchema, FormCategorySchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { HexColorPicker } from 'react-colorful';
import validateColor from 'validate-color';
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/app/services/categories';
import { toast } from 'sonner';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { CategoryWithTaskCount } from '..';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  data: CategoryWithTaskCount | null;
}

export function CategoryDialog(props: IProps) {
  const { isOpen, setIsOpen, data } = props;

  const form = useForm<FormCategorySchema>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: {
      name: '',
      color: '#ffffff',
    },
  });

  const queryClient = useQueryClient();
  const { mutateAsync: createCategory, isPending: creatingCategory } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: updatingCategory } =
    useUpdateCategory();

  const onSubmit = (values: FormCategorySchema) => {
    const isColorValid = validateColor(values.color);

    if (!isColorValid) {
      form.setError('color', {
        message: 'Invalid hex color value',
      });

      return;
    }

    if (data) {
      const payload = {
        body: values,
        categoryId: data.id,
      };

      updateCategory(payload, {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['categories.get-all-manage'],
          });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.error;
            toast.error(errorMessage);
            console.error('Error: ', error);
          }
        },
      });
    } else {
      createCategory(values, {
        onSuccess: (data) => {
          toast.success(data.message, {
            duration: 4000,
          });

          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['categories.get-all-manage'],
          });
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

  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        name: data.name,
        color: data.color,
      });
    }

    if (isOpen && !data) {
      form.reset({
        name: '',
        color: '#ffffff',
      });
    }
  }, [isOpen, data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Define a name and color for your new category to help organize your
            tasks more effectively.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name...' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a unique category name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <HexColorPicker
                    style={{
                      width: '100%',
                    }}
                    color={field.value}
                    onChange={field.onChange}
                  />
                  <FormLabel>Color</FormLabel>

                  <FormControl>
                    <Input placeholder='Enter hex color...' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a hex value or pick one using the color selector
                    above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='outline'
              type='reset'
              disabled={creatingCategory || updatingCategory}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
            disabled={creatingCategory || updatingCategory}
          >
            {creatingCategory || updatingCategory ? (
              <>
                <Spinner /> Saving
              </>
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
