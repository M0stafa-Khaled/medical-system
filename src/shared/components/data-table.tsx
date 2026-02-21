"use client";

import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import type { IPaginationMeta } from "@/shared/types";
import { cn } from "@/shared/lib/utils";
import { tableRowVariants } from "@/shared/animations";
import DataTablePagination from "./ui/DataTablePagination";
import { motion } from "framer-motion";

export type ColumnDef<T> = {
  key: keyof T | "actions";
  header: ReactNode;
  cell?: (row: T, index?: number | undefined) => ReactNode;
  className?: string;
};

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyMessage?: string;
  meta?: IPaginationMeta;
  isLoading?: boolean;
  skeleton?: ReactNode;
}

export const DataTable = <T extends object>({
  columns,
  data,
  emptyMessage = "لا يوجد بيانات",
  meta,
  skeleton,
  isLoading,
}: DataTableProps<T>) => {
  const shouldShowPagination = meta && meta.last_page > 1;
  const currentPage = meta ? Math.ceil(meta.from / meta.per_page) : 1;

  return (
    <>
      <div className="border-border bg-card max-w-full overflow-hidden rounded-md border shadow-sm">
        <Table className="w-full">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-muted/40 border-border border-b">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn(
                    col.className,
                    "text-muted-foreground py-4 text-center text-sm font-medium text-nowrap"
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            skeleton || null
          ) : (
            <TableBody>
              {data && data.length > 0 ? (
                data.map((row, rIdx) => (
                  <motion.tr
                    key={rIdx}
                    initial="hidden"
                    animate="visible"
                    custom={rIdx}
                    variants={tableRowVariants}
                    className="border-border/60 odd:bg-muted/20 hover:bg-muted/50 border-b transition-colors"
                  >
                    {columns.map((col, cIdx) => (
                      <TableCell
                        key={String(col.key) + cIdx}
                        className={cn(
                          col.className,
                          "text-foreground py-4 text-center text-sm text-nowrap"
                        )}
                      >
                        {col.cell
                          ? col.cell(row, rIdx)
                          : ((row[
                              col.key as keyof T
                            ] as unknown as ReactNode) ?? "غير متاح")}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="text-muted-foreground h-20 py-6 text-center"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}

          <TableFooter>
            <TableRow className="bg-muted/40 border-border border-t">
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={cn(
                    col.className,
                    "text-muted-foreground py-4 text-center text-sm font-medium text-nowrap"
                  )}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination */}
      {shouldShowPagination && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={meta!.last_page}
        />
      )}
    </>
  );
};
