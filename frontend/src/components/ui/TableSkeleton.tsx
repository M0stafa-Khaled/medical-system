import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IProps {
  columns: number;
  rows?: number;
  hasImage?: boolean;
  actionButtons?: number;
}

const SkeletonCaption = () => (
  <TableCaption className="mt-0 py-4 dark:border-muted bg-white/80 dark:bg-dark/70">
    <Skeleton className="h-4 w-1/2 md:w-1/4 rounded-lg px-4" />
  </TableCaption>
);

const SkeletonHeader = ({ columns }: { columns: number }) => (
  <TableHeader>
    <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
      {Array.from({ length: columns }, (_, idx) => (
        <TableHead key={idx}>
          <Skeleton className="mx-auto h-4 w-32 rounded-lg" />
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

const SkeletonCell = () => (
  <TableCell>
    <Skeleton className="mx-auto h-4 w-24 rounded-lg" />
  </TableCell>
);

const SkeletonImageCell = () => (
  <TableCell className="py-3">
    <Skeleton className="mx-auto w-12 h-12 rounded-full" />
  </TableCell>
);

const SkeletonActionsCell = ({ buttons }: { buttons: number }) => (
  <TableCell className="py-3">
    <div className="mx-auto w-fit flex justify-center items-center gap-4">
      {Array.from({ length: buttons }).map((_, idx) => (
        <Skeleton key={idx} className="w-9 h-9 rounded-sm" />
      ))}
    </div>
  </TableCell>
);

const TableSkeleton = ({
  columns,
  rows = 10,
  hasImage = false,
  actionButtons = 2,
}: IProps) => {
  const renderRow = (idx: number) => (
    <TableRow
      key={idx}
      className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
    >
      {hasImage && <SkeletonImageCell />}
      {Array.from({ length: columns - (hasImage ? 2 : 1) }).map((_, idx) => (
        <SkeletonCell key={idx} />
      ))}
      <SkeletonActionsCell buttons={actionButtons} />
    </TableRow>
  );

  return (
    <Table className="border dark:border-muted !rounded-lg overflow-hidden">
      <SkeletonCaption />
      <SkeletonHeader columns={columns} />
      <TableBody>
        {Array.from({ length: rows }).map((_, idx) => renderRow(idx))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
