'use client';

import { Button } from '@/components/ui/button';
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography';
import Image from 'next/image';
import TodoDashboard from '@/public/images/dashboard.jpg';
import { Layers, RefreshCw, Zap } from 'lucide-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className='flex flex-col justify-center items-center text-center w-2/3 lg:w-1/3 gap-2'>
    <div className='p-3 rounded bg-secondary flex justify-center items-center'>
      <Icon className='w-6 h-6' />
    </div>
    <TypographyH4>{title}</TypographyH4>
    <TypographyP>{description}</TypographyP>
  </div>
);

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className='w-xs md:w-xl lg:w-5xl'>
      <div className='flex flex-col gap-4 justify-center items-center text-center'>
        <TypographyH1>Organize your life, one task at a time.</TypographyH1>
        <TypographyP className='text-base lg:w-1/2'>
          Focus on what matters. Todone helps you organize your tasks with
          minimal effort and maximum clarity.
        </TypographyP>
        <Button size='lg' onClick={() => router.push('/sign-in')}>
          Start Organizing
        </Button>
      </div>
    </div>
  );
};

const DashboardImageSection = () => (
  <div className='w-xs md:w-xl lg:w-5xl'>
    <div className='shadow-2xl'>
      <Image src={TodoDashboard} alt='Todone dashboard' />
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className='w-xs md:w-xl lg:w-5xl space-y-16'>
    <div className='space-y-4 text-center'>
      <TypographyH1>Everything you need</TypographyH1>
      <TypographyP>
        Simple yet powerful to help you stay organized and productive.
      </TypographyP>
    </div>
    <div className='w-full flex flex-col lg:flex-row justify-center items-center lg:justify-baseline lg:items-start gap-16'>
      <FeatureCard
        icon={Zap}
        title='Quick capture'
        description='Add tasks instantly with keyboard shortcuts. No friction, just action.'
      />
      <FeatureCard
        icon={Layers}
        title='Organize with ease'
        description='Categorize and prioritize your tasks effortlessly for a more efficient workflow.'
      />
      <FeatureCard
        icon={RefreshCw}
        title='Sync everywhere'
        description='Access your tasks from any device. Always in sync, always up to date.'
      />
    </div>
  </div>
);

const CallToActionSection = () => {
  const router = useRouter();
  return (
    <div className='w-full h-96 bg-secondary flex flex-col gap-4 justify-center items-center'>
      <TypographyH1>Ready to get things done?</TypographyH1>
      <TypographyP>Join now to simplify your task management.</TypographyP>
      <Button size='lg' onClick={() => router.push('/sign-in')}>
        Start today
      </Button>
    </div>
  );
};

const FooterSection = () => {
  const now = dayjs().get('year');
  return (
    <footer className='w-full py-5 lg:py-10 bg-primary flex flex-col gap-20 justify-center items-center -mt-20 md:-mt-30 lg:-mt-40 text-background'>
      <div className='w-xs md:w-xl lg:w-5xl flex flex-col lg:flex-row gap-10 lg:gap-0 items-center lg:justify-between lg:items-end'>
        <div className='flex flex-col gap-1 lg:w-1/3 order-1 items-center lg:items-start'>
          <span className='font-bold text-lg'>todone</span>
          <p className='text-sm'>organize your life, one task at a time</p>
        </div>
        <div className='lg:w-1/3 lg:text-center order-3 lg:order-2'>
          <TypographySmall>
            &copy; {now} todone. All rights reserved.
          </TypographySmall>
        </div>
        <div className='lg:w-1/3 flex flex-col gap-1 items-center lg:text-right lg:items-end order-2 lg:order-3'>
          <span className='font-bold text-lg'>by</span>
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
  );
};

export default function Home() {
  return (
    <section className='flex flex-col gap-20 md:gap-30 lg:gap-40 justify-center items-center mt-20 lg:mt-40 w-full'>
      <HeroSection />
      <DashboardImageSection />
      <FeaturesSection />
      <CallToActionSection />
      <FooterSection />
    </section>
  );
}
