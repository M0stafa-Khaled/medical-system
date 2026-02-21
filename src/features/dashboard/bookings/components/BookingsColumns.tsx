import { ColumnDef } from "@/shared/components/data-table";
import { IBooking } from "../types";
import truncateText from "@/shared/utils/truncateText";
import { UpdateBookingStatus } from "./UpdateBookingStatus";
import convertDay from "@/shared/utils/convertDayLang";
import formatDateTime from "@/shared/utils/formatDate";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import CreateTransaction from "@/features/dashboard/transactions/components/CreateTransaction";
import { Eye, Pen } from "lucide-react";
import { DeleteAlert } from "@/shared/components/delete-alert";
import { useDeleteBooking } from "../queriesAndMutations";

export const useBookingsColumns = (): ColumnDef<IBooking>[] => {
  const canUpdateBooking = useHasPermission(PERMISSIONS.UPDATE_BOOKING);
  const canDeleteBooking = useHasPermission(PERMISSIONS.DELETE_BOOKING);
  const canViewBooking = useHasPermission(PERMISSIONS.VIEW_BOOKING);

  const canCreateTransaction = useHasPermission(PERMISSIONS.ADD_TRANSACTION);
  const canCreatePrescription = useHasPermission(PERMISSIONS.ADD_PRESCRIPTION);

  const { mutateAsync: deleteBooking } = useDeleteBooking();

  return [
    {
      key: "code",
      header: "رقم الحجز",
    },
    {
      key: "patient.name" as keyof IBooking,
      header: "المريض",
      cell: (row) => truncateText(row.patient?.name, 20),
    },
    {
      key: "patient.first_phone" as keyof IBooking,
      header: "رقم الهاتف",
    },
    {
      key: "doctor.name" as keyof IBooking,
      header: "الطبيب",
      cell: (row) => truncateText(row.doctor?.name, 15),
    },
    {
      key: "status" as keyof IBooking,
      header: "الحالة",
      cell: (row) => <UpdateBookingStatus booking={row} />,
    },
    {
      key: "day",
      header: "اليوم",
      cell: (row) => convertDay(row?.day, "en"),
    },
    {
      key: "booking_date",
      header: "تاريخ الحجز",
      cell: (row) => formatDateTime(row.booking_date),
    },
    ...(canDeleteBooking ||
    canUpdateBooking ||
    canViewBooking ||
    canCreateTransaction
      ? [
          {
            key: "actions" as const,
            header: "الاجراءات",
            cell: (row: IBooking) => (
              <div className="flex items-center justify-center gap-2">
                {canCreatePrescription && row.status === "collected" && (
                  <TooltipButton title="إصدار روشتة">
                    <Button
                      className="btn-primary rounded-full"
                      size={"icon"}
                      asChild
                    >
                      <Link
                        to={`/dashboard/bookings/${row?.id}/prescriptions/create`}
                      >
                        <LiaNotesMedicalSolid size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}

                {canCreateTransaction &&
                  (row.status === "pending" || row.status === "completed") && (
                    <CreateTransaction booking={row} />
                  )}
                {canViewBooking && (
                  <TooltipButton title="عرض">
                    <Button
                      className="btn-primary rounded-full"
                      size={"icon"}
                      asChild
                    >
                      <Link to={`/dashboard/bookings/${row?.id}`}>
                        <Eye size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canUpdateBooking &&
                  row.status !== "collected" &&
                  row.status !== "completed" && (
                    <TooltipButton title="تعديل">
                      <Button
                        asChild
                        className="btn-edit rounded-full"
                        size={"icon"}
                      >
                        <Link to={`/dashboard/bookings/${row?.id}/update`}>
                          <Pen />
                        </Link>
                      </Button>
                    </TooltipButton>
                  )}
                {canDeleteBooking && row.status !== "cancelled" && (
                  <DeleteAlert
                    name={`حجز المريض ${row?.patient?.name} رقم ${row?.code}`}
                    deleteAction={() =>
                      deleteBooking({ id: row?.id.toString() })
                    }
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
