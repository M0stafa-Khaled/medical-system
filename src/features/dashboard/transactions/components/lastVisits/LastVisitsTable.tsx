import DataTable from "@/shared/components/ui/DataTable";
import LastVisitsHeader from "./LastVisitsHeader";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetPatientLastVisits } from "@/features/dashboard/transactions/queriesAndMutations";
import LastVisitsTableHeader from "./LastVisitsTableHeader";
import LastVisitsList from "./LastVisitsList";
import DataLoader from "@/shared/components/ui/DataLoader";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";

const LastVisitsTable = () => {
  const { doctorId, patientId } = useParams();

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetPatientLastVisits({
    doctorId: doctorId!,
    patientId: patientId!,
  });

  const canRefundTransaction = useHasPermission(PERMISSIONS.REFUND_TRANSACTION);
  const canViewTransaction = useHasPermission(PERMISSIONS.VIEW_TRANSACTION);

  useEffect(() => {
    if (transactions?.message && !transactions.status)
      toast.error(transactions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [transactions?.message, isError, transactions?.status]);

  if (isLoading) return <DataLoader />;

  return (
    <DataTable
      isLoading={isLoading}
      header={
        <LastVisitsHeader name={transactions?.data[0]?.patient.name || ""} />
      }
      tableHeader={<LastVisitsTableHeader />}
      list={<LastVisitsList transactions={transactions?.data || []} />}
      skeleton={
        <TableSkeleton
          columns={canRefundTransaction || canViewTransaction ? 6 : 5}
          rows={6}
          actionButtons={3}
        />
      }
    />
  );
};

export default LastVisitsTable;
