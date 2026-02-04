import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import formatDateTime from "@/utils/formatDate";
import { IPatient } from "@/interfaces/dashboard/patient";

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
        className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300"
      >
        <TableCell
          colSpan={9}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
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
          className="dark:border-muted bg-white/40! dark:bg-dark/40! hover:bg-gray-200! dark:hover:bg-dark! transition-all duration-300 *:whitespace-nowrap"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 px-4 font-medium w-20">
            {patient?.name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-nowrap">
            {patient?.first_phone}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {patient?.status ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                مفعل
              </Badge>
            ) : (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                غير مفعل
              </Badge>
            )}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            {patient?.personal_id || "لا يوجد رقم هوية"}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {patient?.user.active ? (
              <Badge className="bg-emerald-600/30 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2" />
                مؤكد
              </Badge>
            ) : (
              <Badge className="bg-red-600/30 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 ml-2" />
                غير مؤكد
              </Badge>
            )}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
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
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
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
          <td className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
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
