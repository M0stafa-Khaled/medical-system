import { Table, TableBody } from "@/components/ui/table";
import { ReactNode } from "react";
import DataTablePagination from "./DataTablePagination";
import { IPaginationLink } from "@/interfaces";

interface DataTableProps {
  isLoading: boolean;
  actions: ReactNode;
  header: ReactNode;
  list: ReactNode;
  skeleton: ReactNode;
  pagination?: {
    links: IPaginationLink[];
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
  const shouldShowPagination = pagination && pagination.links.length > 3;

  return (
    <>
      {actions}
      {isLoading ? (
        skeleton
      ) : (
        <>
          <Table className="border dark:border-muted !rounded-lg overflow-hidden">
            {header}
            <TableBody>{list}</TableBody>
          </Table>
          {shouldShowPagination && (
            <DataTablePagination links={pagination.links} />
          )}
        </>
      )}
    </>
  );
};

export default DataTable;
