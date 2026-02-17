import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { IBalance } from "@/interfaces/patientBalances";
import { DataTable } from "@/components/shared/data-table";
import { usePatientBalancesColumns } from "./PatientBalancesColumns";

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
