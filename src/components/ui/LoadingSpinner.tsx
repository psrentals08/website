import { cn } from '@/lib/utils';

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center min-h-[200px]', className)}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-brand-orange/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-orange animate-spin" />
      </div>
    </div>
  );
}
