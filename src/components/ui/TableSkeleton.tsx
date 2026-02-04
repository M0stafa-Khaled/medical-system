import { tableSkeletonVariants } from "@/animations";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell } from "@/components/ui/table";
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
    <Skeleton className="mx-auto w-12 h-12 rounded-full" />
  </TableCell>
);

const SkeletonActionsCell = ({ buttons }: { buttons: number }) => (
  <TableCell className="py-3">
    <div className="mx-auto w-fit flex justify-center items-center gap-2">
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
      className={`dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300 ${
        !hasImage ? "h-14" : ""
      }`}
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
