'use client';

import { Button } from '@/components/ui/button';
import {
  TypographyH1,
  TypographyH4,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography';
import Image from 'next/image';

import TodoDashboard from '@/public/images/dashboard.jpg';
import { Github, Layers, Linkedin, Mail, RefreshCw, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const now = dayjs().get('year');

  const router = useRouter();

  return (
    <section className='flex flex-col gap-40 justify-center items-center mt-40 w-full'>
      {/* 1 */}
      <div className='w-4/6'>
        <div className='flex flex-col gap-4 justify-center items-center text-center'>
          <TypographyH1>Organize your life, one task at time.</TypographyH1>
          <TypographyP className='text-base'>
            Focus on what matters. Todone helps you organize your tasks with
            minimal effort and maximum clarity
          </TypographyP>
          <Button
            size={'lg'}
            onClick={() => {
              router.push('/sign-in');
            }}
          >
            Start Organize
          </Button>
        </div>
      </div>

      {/* 2 */}
      <div className='w-5xl'>
        <div className='shadow-2xl'>
          <Image src={TodoDashboard} alt='Todone dashboard' />
        </div>
      </div>

      {/* 3 */}
      <div className='space-y-16 w-5xl'>
        <div className='space-y-4 text-center'>
          <TypographyH1>Everything you need</TypographyH1>
          <TypographyP>
            Simple yet powerful to help you stat organized and productive.
          </TypographyP>
        </div>

        <div className='w-full flex gap-16'>
          <div className='flex flex-col justify-center items-center text-center w-1/3 gap-2'>
            <div className='p-3 rounded bg-secondary flex justify-center items-center'>
              <Zap className='w-6 h-6' />
            </div>

            <TypographyH4>Quick capture</TypographyH4>

            <TypographyP>
              Add tasks instantly with keyboard shortcuts. No friction, just
              action.
            </TypographyP>
          </div>

          <div className='flex flex-col justify-center items-center text-center w-1/3 gap-2'>
            <div className='p-3 rounded bg-secondary flex justify-center items-center'>
              <Layers className='w-6 h-6' />
            </div>

            <TypographyH4>Organize with ease</TypographyH4>

            <TypographyP>
              Categorize and prioritize your tasks effortlessly for a more
              efficient workflow.
            </TypographyP>
          </div>

          <div className='flex flex-col justify-center items-center text-center w-1/3 gap-2'>
            <div className='p-3 rounded bg-secondary flex justify-center items-center'>
              <RefreshCw className='w-6 h-6' />
            </div>

            <TypographyH4>Sync everywhere</TypographyH4>

            <TypographyP>
              Access your tasks from any device. Always in sync, always up to
              date.
            </TypographyP>
          </div>
        </div>
      </div>

      {/* 4 */}
      <div className='w-full h-96 bg-secondary flex flex-col gap-4 justify-center items-center'>
        <TypographyH1>Ready to get things done?</TypographyH1>

        <TypographyP>Join now to simplified your task management.</TypographyP>

        <Button
          size={'lg'}
          onClick={() => {
            router.push('/sign-in');
          }}
        >
          Start today
        </Button>
      </div>

      {/* 5 */}
      <footer className='w-full py-10 bg-primary flex flex-col gap-20 justify-center items-center -mt-40 text-background'>
        <div className='w-5xl flex justify-between items-end'>
          <div className='flex flex-col gap-1 w-1/3'>
            <span className='font-bold text-lg'>todone</span>
            <p className='text-sm'>organize your life, one task at time</p>
          </div>

          <div className='w-1/3 text-center'>
            <TypographySmall>
              &copy; {now} todone. All rights reserved.
            </TypographySmall>
          </div>

          <div className=' w-1/3 flex flex-col gap-1 text-right items-end'>
            <span className='font-bold text-lg'>developed by</span>
            <Link
              href={'https://www.rizky-mahendra.dev'}
              target='_blank'
              className='text-sm hover:underline cursor-pointer transition-all'
            >
              Rizky Putra Mahendra
            </Link>
          </div>
        </div>
      </footer>
    </section>
  );
}
