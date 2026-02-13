import { Skeleton } from "./skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="py-2 px-3 border-b border-border bg-background dark:bg-dark">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="pe-4 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
