import { cn } from '@/lib/utils';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: IProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: IProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: IProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyP({ children, className }: IProps) {
  return <p className={cn('leading-7 text-sm', className)}>{children}</p>;
}

export function TypographySmall({ children, className }: IProps) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className }: IProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  );
}
