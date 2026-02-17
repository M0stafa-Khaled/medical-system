import { Badge } from "@/shared/components/ui/badge";
import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import formatDateTime from "@/shared/utils/formatDate";
import { IPatient } from "@/features/dashboard/patients/types";

interface IProps {
  patients: IPatient[];
}

const PatientsReportList = ({ patients: patients }: IProps) => {
  if (!patients.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={9}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد مرضى
        </TableCell>
      </motion.tr>
    );
  return (
    <>
      {patients.map((patient, index) => (
        <motion.tr
          key={patient?.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 *:whitespace-nowrap hover:bg-gray-200!"
        >
          <TableCell className="w-20 px-4 py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient?.name}
          </TableCell>
          <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {patient?.first_phone}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient?.status ? (
              <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                مفعل
              </Badge>
            ) : (
              <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                غير مفعل
              </Badge>
            )}
          </TableCell>
          <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient?.personal_id || "لا يوجد رقم هوية"}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient?.user.active ? (
              <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                مؤكد
              </Badge>
            ) : (
              <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                غير مؤكد
              </Badge>
            )}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient.user.last_login_at
              ? formatDateTime(patient?.user.last_login_at, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              : "غير معروف"}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
            {patient.user.last_logout_at
              ? formatDateTime(patient?.user.last_logout_at, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              : "غير معروف"}
          </TableCell>
          <td className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {formatDateTime(patient?.created_at, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default PatientsReportList;
