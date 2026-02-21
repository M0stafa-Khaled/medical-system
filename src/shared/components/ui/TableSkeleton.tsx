import { tableSkeletonVariants } from "@/shared/animations";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TableBody, TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";

interface IProps {
  columns: number;
  rows?: number;
  hasImage?: boolean;
  actionButtons?: number;
  showButtons?: boolean;
}

const SkeletonCell = () => (
  <TableCell>
    <Skeleton className={`mx-auto h-3 w-16 rounded-lg`} />
  </TableCell>
);

const SkeletonImageCell = () => (
  <TableCell className="py-3">
    <Skeleton className="mx-auto h-12 w-12 rounded-full" />
  </TableCell>
);

const SkeletonActionsCell = ({ buttons }: { buttons: number }) => (
  <TableCell className="py-3">
    <div className="mx-auto flex w-fit items-center justify-center gap-2">
      {Array.from({ length: buttons }).map((_, idx) => (
        <Skeleton key={idx} className="h-9 w-9 rounded-sm" />
      ))}
    </div>
  </TableCell>
);

const TableSkeleton = ({
  columns,
  rows = 10,
  hasImage = false,
  actionButtons = 1,
  showButtons = true,
}: IProps) => {
  const renderRow = (idx: number) => (
    <motion.tr
      key={idx}
      initial="hidden"
      animate="visible"
      custom={idx}
      variants={tableSkeletonVariants}
      className={`${!hasImage ? "h-14" : ""}`}
    >
      <SkeletonCell />
      {hasImage && <SkeletonImageCell />}
      {Array.from({
        length:
          columns -
          (hasImage && showButtons ? 2 : hasImage || showButtons ? 1 : 0),
      }).map((_, idx) => (
        <SkeletonCell key={idx} />
      ))}
      {showButtons && <SkeletonActionsCell buttons={actionButtons} />}
    </motion.tr>
  );

  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, idx) => renderRow(idx))}
    </TableBody>
  );
};

export default TableSkeleton;
