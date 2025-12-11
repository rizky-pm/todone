'use client';

import { useDropzone } from '@uploadthing/react';
import { SetStateAction, useCallback } from 'react';
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from 'uploadthing/client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Upload } from 'lucide-react';
import { ExpandedRouteConfig } from 'uploadthing/types';

interface IProps {
  src: string | null;
  fallback: string;
  setFiles: React.Dispatch<SetStateAction<File[]>>;
  routeConfig: ExpandedRouteConfig | undefined;
}

export function ImageUploader({
  src,
  fallback,
  setFiles,
  routeConfig,
}: IProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  return (
    <div
      className='w-full flex justify-center cursor-pointer relative'
      {...getRootProps()}
    >
      <Avatar className='rounded-full w-40 h-40 flex justify-center items-center border'>
        <AvatarImage src={src || ''} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      <div className='w-full h-full flex justify-center items-center bg-gray-200 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 transition-all'>
        <Upload className='text-gray-400' />
      </div>

      <input {...getInputProps()} />
    </div>
  );
}
