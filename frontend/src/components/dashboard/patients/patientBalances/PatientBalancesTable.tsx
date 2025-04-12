import DataTable from "@/components/ui/DataTable";
import TableSkeleton from "@/components/ui/TableSkeleton";
import PatientBalancesList from "./PatientBalancesList";
import PatientBalancesTableHeader from "./PatientBalancesTableHeader";
import { IBalance } from "@/interfaces/dashboard/transactions/patientBalances";

interface IProps {
  patientBalances: IBalance[];
}
const PatientBalancesTable = ({ patientBalances }: IProps) => {
  return (
    <DataTable
      isLoading={false}
      header={null}
      tableHeader={<PatientBalancesTableHeader />}
      list={<PatientBalancesList patients={patientBalances} />}
      skeleton={<TableSkeleton columns={3} rows={6} actionButtons={3} />}
    />
  );
};

export default PatientBalancesTable;
