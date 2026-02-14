import { Badge } from "@/shared/components/ui/badge";
import { TableCell } from "@/shared/components/ui/table";
import { IDoctor } from "@/interfaces/dashboard/doctors/doctor";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import DeleteDoctor from "./DeleteDoctor";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { IPaginationMeta } from "@/shared/types";
import countSerial from "@/shared/utils/countSerial";
import truncateText from "@/shared/utils/truncateText";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Pen } from "lucide-react";

interface IProps {
  doctors: IDoctor[];
  meta?: IPaginationMeta;
}
const DoctorsList = ({ doctors, meta }: IProps) => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctor = useHasPermission(PERMISSIONS.VIEW_DOCTOR);

  if (!doctors.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={7}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
        >
          لا يوجد اطباء
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {doctors.map(
        ({ id, name, status, image, first_phone, clinics }, index) => (
          <motion.tr
            key={id}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={tableRowVariants}
            className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
          >
            <TableCell className="w-20 py-3 text-center text-sm font-medium text-black dark:text-white">
              {countSerial({ meta: meta!, index })}
            </TableCell>
            <TableCell className="flex items-center justify-center py-3 text-center text-sm font-medium text-black dark:text-white">
              <img
                src={image || "/images/avatar.svg"}
                alt={name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
              {truncateText(name, 15)}
            </TableCell>
            <TableCell className="max-w-44 py-3 text-center text-sm font-medium text-black dark:text-white">
              {clinics.map(({ name }) => name).join(", ")}
            </TableCell>
            <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
              {first_phone}
            </TableCell>

            <TableCell className="py-3 text-center text-sm font-medium text-black dark:text-white">
              {status ? (
                <Badge className="rounded-full bg-emerald-600/30 text-emerald-800 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20 dark:text-emerald-500">
                  <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-800 dark:bg-emerald-500" />
                  نشط
                </Badge>
              ) : (
                <Badge className="rounded-full bg-red-600/30 text-red-500 shadow-none hover:bg-red-600/10 dark:bg-red-600/20">
                  <div className="ml-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                  غير نشط
                </Badge>
              )}
            </TableCell>

            {(canDeleteDoctor || canUpdateDoctor || canViewDoctor) && (
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {canViewDoctor && (
                    <TooltipButton title="عرض">
                      <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                        <Link
                          to={`/dashboard/doctors/${id}`}
                          className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
                        >
                          <FiEye size={24} />
                        </Link>
                      </Button>
                    </TooltipButton>
                  )}
                  {canUpdateDoctor && (
                    <TooltipButton title="تعديل">
                      <Button className="h-auto gap-2 bg-blue-600 px-0 py-0 text-sm text-white hover:bg-blue-700">
                        <Link
                          to={`/dashboard/doctors/${id}/update`}
                          className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
                        >
                          <Pen size={20} />
                        </Link>
                      </Button>
                    </TooltipButton>
                  )}
                  {canDeleteDoctor && <DeleteDoctor name={name} id={id} />}
                </div>
              </TableCell>
            )}
          </motion.tr>
        )
      )}
    </>
  );
};

export default DoctorsList;
