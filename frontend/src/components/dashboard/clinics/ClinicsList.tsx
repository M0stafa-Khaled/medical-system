import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditClinicModalButton from "./EditClinicModalButton";
import DeleteClinicButton from "./DeleteClinicModalButton";
import { useGetAllClinics } from "@/lib/react-query/clinics";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "@/app/features/auth/authSlice";
import { useEffect } from "react";

const ClinicsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: clinics, isLoading, failureReason } = useGetAllClinics();

  const failureReasonObj = failureReason as unknown as {
    status: number;
  };

  useEffect(() => {
    if (failureReasonObj?.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
    }
  }, [failureReasonObj, dispatch, navigate]);

  if (isLoading) {
    return <div className="text-white">جاري التحميل...</div>;
  }

  return (
    <>
      <Table className="border dark:border-muted !rounded-lg overflow-hidden">
        <TableCaption className="mt-0 py-4 dark:border-muted bg-white/80 dark:bg-dark/70">
          العيادات المتاحة
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
            <TableHead className=" py-4 !text-sm text-center">
              اسم العيادة
            </TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="py-4 text-sm text-center">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!clinics?.data.length ? (
            <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
              <TableCell
                colSpan={3}
                className="text-sm text-center text-black dark:text-white py-5 font-medium"
              >
                لا يوجد عيادات
              </TableCell>
            </TableRow>
          ) : (
            clinics?.data.map(({ id, name, status }) => (
              <TableRow
                key={id}
                className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
              >
                <TableCell className="text-sm text-center text-black dark:text-white py-5 font-medium">
                  {name}
                </TableCell>
                <TableCell className="text-sm text-center text-black dark:text-white">
                  <Badge className="bg-green-500 hover:bg-green-500">
                    {status ? "متاحة" : "غير متاحة"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className=" flex justify-center items-center gap-4">
                    <EditClinicModalButton
                      name={name}
                      id={id}
                      status={status}
                    />
                    <DeleteClinicButton name={name} id={id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicsList;
