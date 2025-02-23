import { Skeleton } from "./skeleton";

const ActionSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {Array.from({ length: length }, (_, idx) => (
        <Skeleton key={idx} className="mx-auto h-24 w-full rounded-lg" />
      ))}
    </div>
  );
};

export default ActionSkeleton;
