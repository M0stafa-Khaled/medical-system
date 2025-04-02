import DataTable from "@/components/ui/DataTable";
import LastVisitsHeader from "./LastVisitsHeader";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPatientLastVisits } from "@/lib/react-query/dashboard/transactions/transactions";
import LastVisitsTableHeader from "./LastVisitsTableHeader";
import LastVisitsList from "./LastVisitsList";
import DataLoader from "@/components/ui/DataLoader";

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

  if (isLoading) return <DataLoader />;

  return (
    <DataTable
      isLoading={isLoading}
      header={<LastVisitsHeader name={transactions?.data[0].patient.name} />}
      tableHeader={<LastVisitsTableHeader />}
      list={<LastVisitsList transactions={transactions?.data || []} />}
      skeleton={<TableSkeleton columns={6} rows={6} actionButtons={3} />}
    />
  );
};

export default LastVisitsTable;
