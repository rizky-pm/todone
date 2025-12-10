'use client';

import { useDeletAccountMutation } from '@/app/services/user';
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
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const DangerZone = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const router = useRouter();

  const { mutateAsync: deleteAccount, isPending: deletingAccount } =
    useDeletAccountMutation();

  const onClickConfirmDelete = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        toast.success('Success delete account', {
          duration: 4000,
        });
        router.replace('/sign-in');
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

  const disableDeleteButton = useMemo(() => {
    return deleteConfirmation !== 'Delete';
  }, [deleteConfirmation]);

  return (
    <div className='shadow-sm rounded-lg p-6 space-y-4'>
      <TypographyH4>Danger Zone</TypographyH4>
      <div className='p-4 rounded bg-muted'>
        <TypographyP>
          This section allows you to permanently delete your account. Deleting
          your account is irreversible all your data, including profile
          information and uploaded files, will be permanently removed. Please
          proceed with caution.
        </TypographyP>
      </div>

      <Dialog
        onOpenChange={() => {
          setDeleteConfirmation('');
        }}
      >
        <form>
          <DialogTrigger asChild>
            <Button className='w-full' variant={'destructive'}>
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this account? This action cannot
                be undone. Type &quot;<span className='font-bold'>Delete</span>
                &quot; to proceed.
              </DialogDescription>
            </DialogHeader>

            <Input
              value={deleteConfirmation}
              onChange={(e) => {
                setDeleteConfirmation(e.target.value);
              }}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' disabled={deletingAccount}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                variant={'destructive'}
                disabled={disableDeleteButton || deletingAccount}
                onClick={onClickConfirmDelete}
              >
                {deletingAccount ? (
                  <>
                    <Spinner />
                    Deleting
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default DangerZone;
