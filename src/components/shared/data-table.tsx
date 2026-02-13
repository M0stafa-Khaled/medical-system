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
} from "@/components/ui/table";
import type { IPaginationMeta } from "@/interfaces";
import { cn } from "@/lib/utils";
import DataTablePagination from "../ui/DataTablePagination";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";

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
  skeleton: ReactNode;
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
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden max-w-full">
        <Table className="w-full">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-muted/40 border-b border-border">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn(
                    col.className,
                    "text-center py-4 text-sm font-medium text-muted-foreground text-nowrap",
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            skeleton
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
                    className="border-b border-border/60 odd:bg-muted/20 hover:bg-muted/50 transition-colors"
                  >
                    {columns.map((col, cIdx) => (
                      <TableCell
                        key={String(col.key) + cIdx}
                        className={cn(
                          col.className,
                          "py-4 text-sm text-foreground text-center text-nowrap",
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
                    className="text-center py-6 h-20 text-muted-foreground"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}

          <TableFooter>
            <TableRow className="bg-muted/40 border-t border-border">
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={cn(
                    col.className,
                    "text-center py-4 text-sm font-medium text-muted-foreground text-nowrap",
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
