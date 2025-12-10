'use client';

import { User } from '@/src/generated/client';
import { ImageUploader } from './ImageUploader';
import { useMemo, useState } from 'react';
import { getInitials } from '@/app/lib/string';
import { useForm } from 'react-hook-form';
import { profileFormSchema, TypeProfileFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TypographyH4 } from '@/components/ui/typography';
import { useUploadThing } from '@/lib/utils';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '@/app/services/user';
import { toast } from 'sonner';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/app/store/auth.store';

interface IProps {
  initialData: Pick<User, 'id' | 'email' | 'fullName' | 'image'>;
}

const ProfileForm = (props: IProps) => {
  const {
    initialData: { id, email, fullName, image },
  } = props;

  const [files, setFiles] = useState<File[]>([]);
  const setUser = useAuthStore((store) => store.setUser);

  const queryClient = useQueryClient();

  const { data: currentUserQuery } = useGetCurrentUserQuery({
    initialData: props.initialData,
  });

  const { mutateAsync: updateUser, isPending: updatingUser } =
    useUpdateUserMutation();

  const form = useForm<TypeProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: email,
      fullName: currentUserQuery?.data.fullName ?? fullName,
    },
  });

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    (routeRegistry) => routeRegistry['imageUploader'],
    {
      headers: {
        'x-user-id': id,
      },
      onUploadError: (error) => {
        if (files[0].size >= 512000) {
          toast.error('Image size limit exceeded, max image size is 512Kb');
          return;
        }
        toast.error(error.message);
      },
    }
  );

  const previewImage = useMemo(() => {
    if (files.length > 0) {
      return URL.createObjectURL(files[0]);
    } else {
      if (currentUserQuery?.data.image) {
        return currentUserQuery.data.image;
      }

      if (image) {
        return image;
      }

      return '';
    }
  }, [files, image, currentUserQuery]);

  const onReset = () => {
    setFiles([]);
    form.reset();
  };

  const onSubmit = async (values: TypeProfileFormSchema) => {
    const payload: {
      fullName: string;
      image: string | undefined;
      imageKey: string | undefined;
    } = {
      fullName: values.fullName,
      image: undefined,
      imageKey: undefined,
    };

    const saveUser = async () => {
      updateUser(payload, {
        onSuccess: (response) => {
          toast.success(response.message, {
            duration: 4000,
          });
          setUser(response.data);
          queryClient.invalidateQueries({ queryKey: ['user.get'] });
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

    if (files.length > 0) {
      const response = await startUpload(files);

      if (response) {
        payload.image = response[0].ufsUrl;
        payload.imageKey = response[0].key;

        await saveUser();
      }

      return;
    }

    await saveUser();
  };

  const fullNameFallback = useMemo(() => {
    if (!fullName) return '';

    const fallback = getInitials(fullName);

    return fallback;
  }, [fullName]);

  return (
    <div className='shadow-sm rounded-lg p-6 space-y-4'>
      <TypographyH4>Profile Settings</TypographyH4>

      <ImageUploader
        src={previewImage || null}
        fallback={fullNameFallback}
        setFiles={setFiles}
        routeConfig={routeConfig}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter full name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-right space-x-2'>
            <Button
              type='reset'
              variant={'outline'}
              disabled={updatingUser || isUploading}
              onClick={onReset}
            >
              Reset
            </Button>
            <Button type='submit' disabled={updatingUser || isUploading}>
              {updatingUser || isUploading ? (
                <>
                  <Spinner /> Saving
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
