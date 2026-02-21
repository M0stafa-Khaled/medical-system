import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { DataTable } from "@/shared/components/data-table";
import { usePatientBalancesColumns } from "./PatientBalancesColumns";
import { IBalance } from "@/features/dashboard/transactions/types";

interface IProps {
  patientBalances: IBalance[];
}
export const PatientBalancesTable = ({ patientBalances }: IProps) => {
  const columns = usePatientBalancesColumns();
  return (
    <DataTable
      columns={columns}
      data={patientBalances || []}
      isLoading={false}
      skeleton={<TableSkeleton columns={3} rows={6} actionButtons={3} />}
    />
  );
};
