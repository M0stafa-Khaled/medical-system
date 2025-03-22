import { Table, TableBody } from "@/components/ui/table";
import { ReactNode } from "react";
import DataTablePagination from "./DataTablePagination";
import { IPaginationMeta } from "@/interfaces";

interface DataTableProps {
  isLoading: boolean;
  actions: ReactNode;
  header: ReactNode;
  list: ReactNode;
  skeleton: ReactNode;
  pagination?: {
    meta: IPaginationMeta;
  };
}

const DataTable = ({
  isLoading,
  actions,
  header,
  list,
  skeleton,
  pagination,
}: DataTableProps) => {
  const shouldShowPagination = pagination && pagination.meta.last_page > 1;
  const currentPage = pagination
    ? Math.ceil(pagination.meta.from / pagination.meta.per_page)
    : 1;
  return (
    <>
      {actions}
      {
        <>
          <Table className="border dark:border-muted !rounded-lg overflow-hidden">
            {header}
            {isLoading ? skeleton : <TableBody>{list}</TableBody>}
            {header}
          </Table>
          {shouldShowPagination && (
            <DataTablePagination
              currentPage={currentPage}
              totalPages={pagination.meta.last_page}
            />
          )}
        </>
      }
    </>
  );
};

export default DataTable;
