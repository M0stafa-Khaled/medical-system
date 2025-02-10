import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { ReactNode } from "react";

interface DataTableProps {
  isLoading: boolean;
  caption: string;
  actions: ReactNode;
  header: ReactNode;
  list: ReactNode;
  skeleton: ReactNode;
}

const DataTable = ({
  isLoading,
  caption,
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
          <TableCaption className="mt-0 py-4 dark:border-muted bg-white/80 dark:bg-dark/70">
            {caption}
          </TableCaption>
          {header}
          <TableBody>{list}</TableBody>
        </Table>
      )}
    </>
  );
};

export default DataTable;
