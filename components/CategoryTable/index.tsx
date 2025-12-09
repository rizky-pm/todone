'use client';

import { Prisma } from '@/src/generated/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import dayjs from 'dayjs';
import { Button } from '../ui/button';
import { Edit, Plus, Trash } from 'lucide-react';
import {
  useDeleteCategoryByIdMutation,
  useGetCategoriesManageQuery,
} from '@/app/services/categories';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TypographyH4 } from '../ui/typography';
import { useState } from 'react';
import { CategoryDialog } from './CategoryDialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from '../ui/dialog';

export type CategoryWithTaskCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: {
        tasks: true;
      };
    };
  };
}>;

interface IProps {
  initialData: CategoryWithTaskCount[];
}

const CategoryTable = (props: IProps) => {
  const { initialData } = props;

  const [dialogDeleteProperty, setIsDialogDeleteProperty] = useState<{
    isOpen: boolean;
    categoryId: string | null;
  }>({
    isOpen: false,
    categoryId: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProperty, setDialogProperty] =
    useState<CategoryWithTaskCount | null>(null);

  const queryClient = useQueryClient();
  const { data: categoriesQuery } = useGetCategoriesManageQuery();
  const { mutateAsync: deleteCategory, isPending: deletingCategory } =
    useDeleteCategoryByIdMutation();

  const categories = categoriesQuery?.data ?? initialData;

  const onClickEditCategory = (category: CategoryWithTaskCount) => {
    setIsDialogOpen(true);
    setDialogProperty(category);
  };

  const onClickDeleteCategory = () => {
    if (!dialogDeleteProperty.categoryId) return;

    deleteCategory(dialogDeleteProperty.categoryId, {
      onSuccess: (data) => {
        toast.success(data.message, {
          duration: 4000,
        });
        queryClient.invalidateQueries({
          queryKey: ['categories.get-all-manage'],
        });
        setIsDialogDeleteProperty({ categoryId: null, isOpen: false });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.error;
          toast.error(errorMessage);
          console.error('Error: ', error);
        }
      },
    });
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <TypographyH4>Categories</TypographyH4>

        <Button
          size={'sm'}
          onClick={() => {
            setDialogProperty(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item) => {
            const disableAction = !item.userId;

            return (
              <TableRow key={item.id}>
                <TableCell className='flex items-center gap-2'>
                  <span
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item._count.tasks}</TableCell>
                <TableCell>
                  {dayjs(item.createdAt).format('MMM D, YYYY')}
                </TableCell>
                <TableCell>{item.userId ? 'User' : 'System'}</TableCell>
                <TableCell className='text-right space-x-2'>
                  <Button
                    variant={'destructive'}
                    size={'icon-sm'}
                    disabled={disableAction}
                    onClick={() => {
                      setIsDialogDeleteProperty({
                        isOpen: true,
                        categoryId: item.id,
                      });
                    }}
                  >
                    <Trash />
                  </Button>
                  <Button
                    size={'icon-sm'}
                    disabled={disableAction}
                    onClick={() => {
                      onClickEditCategory(item);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <CategoryDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data={dialogProperty}
      />

      <Dialog
        open={dialogDeleteProperty.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setIsDialogDeleteProperty(() => ({
              categoryId: null,
              isOpen: false,
            }));
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={deletingCategory}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              onClick={onClickDeleteCategory}
              disabled={deletingCategory}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryTable;
