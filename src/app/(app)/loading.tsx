import { SkeletonKPI, SkeletonTable } from '@/components/ui/Skeleton';

export default function AppLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-4 w-96 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonKPI />
        <SkeletonKPI />
        <SkeletonKPI />
        <SkeletonKPI />
      </div>
      <SkeletonTable rows={5} />
    </div>
  );
}
