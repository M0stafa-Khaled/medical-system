import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  length?: number;
}
const SkeletonClinicsList = ({ length = 10 }: IProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      {Array.from({ length }).map(() => (
        <Skeleton
          key={Math.random()}
          className="h-14 rounded-none flex items-center justify-between gap-4 md:gap-32 px-4"
        >
          <Skeleton className="h-4 w-1/3 rounded-lg" />
          <Skeleton className="h-4 w-1/3 rounded-lg" />
          {/* Buttons */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map(() => (
              <Skeleton
                key={Math.random()}
                className="h-6 w-10 md:w-14 rounded-sm"
              />
            ))}
          </div>
        </Skeleton>
      ))}
      <Skeleton className="h-14 rounded-none flex items-center justify-center gap-4 md:gap-20 px-4">
        <Skeleton className="h-4 w-1/2 md:w-1/4 rounded-lg flex items-center justify-between gap-4 md:gap-20 px-4" />
      </Skeleton>
    </div>
  );
};

export default SkeletonClinicsList;
