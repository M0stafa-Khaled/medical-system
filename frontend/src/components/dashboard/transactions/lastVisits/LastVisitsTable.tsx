import DataTable from "@/components/ui/DataTable";
import LastVisitsHeader from "./LastVisitsHeader";
import TransactionsList from "../TransactionsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPatientLastVisits } from "@/lib/react-query/dashboard/transactions/transactions";
import LastVisitsTableHeader from "./LastVisitsTableHeader";

const LastVisitsTable = () => {
  const token = cookieServices.getToken()!;
  const { doctorId, patientId } = useParams();

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetPatientLastVisits({
    token,
    doctorId: doctorId!,
    patientId: patientId!,
  });

  useEffect(() => {
    if (transactions?.message) toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={<LastVisitsHeader />}
      tableHeader={<LastVisitsTableHeader />}
      list={<TransactionsList transactions={transactions?.data || []} />}
      skeleton={<TableSkeleton columns={8} rows={6} actionButtons={3} />}
    />
  );
};

export default LastVisitsTable;
