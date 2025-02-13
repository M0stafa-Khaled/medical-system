import { Table, TableBody } from "@/components/ui/table";
import { ReactNode } from "react";

interface DataTableProps {
  isLoading: boolean;
  actions: ReactNode;
  header: ReactNode;
  list: ReactNode;
  skeleton: ReactNode;
}

const DataTable = ({
  isLoading,
  actions,
  header,
  list,
  skeleton,
}: DataTableProps) => {
  return (
    <>
      {actions}
      {isLoading ? (
        skeleton
      ) : (
        <Table className="border dark:border-muted !rounded-lg overflow-hidden">
          {header}
          <TableBody>{list}</TableBody>
          {header}
        </Table>
      )}
    </>
  );
};

export default DataTable;
