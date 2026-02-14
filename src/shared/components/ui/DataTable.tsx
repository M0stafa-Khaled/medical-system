import { Table, TableBody } from "@/shared/components/ui/table";
import { ReactNode } from "react";
import DataTablePagination from "./DataTablePagination";
import { IPaginationMeta } from "@/shared/types";

interface DataTableProps {
  isLoading: boolean;
  header?: ReactNode;
  tableHeader: ReactNode;
  list: ReactNode;
  skeleton?: ReactNode;
  pagination?: {
    meta: IPaginationMeta;
  };
}

const DataTable = ({
  isLoading,
  header,
  tableHeader,
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
      {header}
      {
        <>
          <Table className="dark:border-muted overflow-hidden rounded-lg! border">
            {tableHeader}
            {isLoading ? skeleton : <TableBody>{list}</TableBody>}
            {tableHeader}
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
