import Image from 'next/image';
import { cn } from '@/lib/utils';
import { unsplashUrl } from '@/lib/constants';

interface AvatarProps {
  photoId?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { wh: 32, cls: 'h-8 w-8' },
  md: { wh: 40, cls: 'h-10 w-10' },
  lg: { wh: 48, cls: 'h-12 w-12' },
};

export function Avatar({ photoId, name, size = 'md', className }: AvatarProps) {
  const s = sizes[size];
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  if (photoId) {
    return (
      <Image
        src={unsplashUrl(photoId, s.wh * 2, s.wh * 2)}
        alt={name}
        width={s.wh}
        height={s.wh}
        className={cn('rounded-full object-cover', s.cls, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-100 text-brand-700 font-medium text-xs dark:bg-brand-900 dark:text-brand-300',
        s.cls,
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
