import { tableSkeletonVariants } from "@/animations/dashboardAnimations";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { motion } from "framer-motion";

interface IProps {
  columns: number;
  rows?: number;
  hasImage?: boolean;
  actionButtons?: number;
  showButtons?: boolean;
}

const SkeletonHeader = ({ columns }: { columns: number }) => (
  <TableHeader>
    <motion.tr
      initial="hidden"
      animate="visible"
      variants={tableSkeletonVariants}
      className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70"
    >
      {Array.from({ length: columns }, (_, idx) => (
        <TableHead key={idx} className="py-5">
          <Skeleton
            className={`mx-auto h-4 ${idx === 0 ? "w-20" : "w-28"} rounded-lg`}
          />
        </TableHead>
      ))}
    </motion.tr>
  </TableHeader>
);

const SkeletonCell = ({ width = "w-24" }: { width?: string }) => (
  <TableCell>
    <Skeleton className={`mx-auto h-3 ${width} rounded-lg`} />
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
  actionButtons = 2,
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
      <SkeletonCell width="w-16" />
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
    <Table className="border dark:border-muted !rounded-lg overflow-hidden">
      <SkeletonHeader columns={columns + 1} />
      <TableBody>
        {Array.from({ length: rows }).map((_, idx) => renderRow(idx))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
