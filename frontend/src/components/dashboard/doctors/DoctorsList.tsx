import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { IDoctor } from "@/interfaces/doctor";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DeleteDoctorButton from "./DeleteDoctorModalButton";
import { FaPencil } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations/dashboardAnimations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";

interface IProps {
  doctors: IDoctor[];
}
const DoctorsList = ({ doctors }: IProps) => {
  const canEditDoctor = useHasPermission(PERMISSIONS.EDIT_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctor = useHasPermission(PERMISSIONS.VIEW_DOCTOR);

  if (!doctors.length)
    return (
      <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
        <TableCell
          colSpan={7}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد اطباء
        </TableCell>
      </TableRow>
    );

  return (
    <>
      {doctors.map(({ id, name, status, image, first_phone, clinics }, idx) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={idx}
          variants={tableRowVariants}
          className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
        >
          <TableCell className="flex justify-center items-center text-sm text-center text-black dark:text-white py-3 font-medium">
            <img
              src={image || "/avatar.svg"}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44 text-wrap">
            {name}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium max-w-44">
            {clinics.map(({ name }) => name).join(", ")}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {first_phone}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
            {status ? (
              <Badge className="bg-green-500 hover:bg-green-500">مفعل </Badge>
            ) : (
              <Badge variant={"destructive"}>غير مفعل</Badge>
            )}
          </TableCell>

          {(canDeleteDoctor || canEditDoctor || canViewDoctor) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-3">
                {canViewDoctor && (
                  <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                    <Link
                      to={`/dashboard/doctors/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                    >
                      <FiEye size={24} />
                    </Link>
                  </Button>
                )}
                {canEditDoctor && (
                  <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                    <Link
                      to={`/dashboard/doctors/update/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                    >
                      <FaPencil size={18} />
                    </Link>
                  </Button>
                )}
                {canDeleteDoctor && <DeleteDoctorButton name={name} id={id} />}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default DoctorsList;
