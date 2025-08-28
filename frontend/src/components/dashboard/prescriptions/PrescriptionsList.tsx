import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import truncateText from "@/utils/truncateText";
import TooltipButton from "@/components/ui/TooltipButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Pen } from "lucide-react";
import DeletePrescription from "./DeletePrescription";
import { IPrescription } from "@/interfaces/dashboard/prescription";
import PrintPrescriptionReceipt from "./PrintPrescriptionReceipt";

interface IProps {
  prescriptions: IPrescription[];
}
const PrescriptionsList = ({ prescriptions }: IProps) => {
  const canUpdatePrescription = useHasPermission(
    PERMISSIONS.UPDATE_PRESCRIPTION
  );
  const canDeletePrescription = useHasPermission(
    PERMISSIONS.DELETE_PRESCRIPTION
  );
  const canViewPrescription = useHasPermission(PERMISSIONS.VIEW_PRESCRIPTION);

  if (!prescriptions.length)
    return (
      <motion.tr
        initial="hidden"
        animate="visible"
        variants={tableRowVariants}
        className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
      >
        <TableCell
          colSpan={6}
          className="text-sm text-center text-black dark:text-white py-5 font-medium"
        >
          لا يوجد روشتات
        </TableCell>
      </motion.tr>
    );

  return (
    <>
      {prescriptions?.map((pres, index) => (
        <motion.tr
          key={pres.id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted !bg-white/40 dark:!bg-dark/40 hover:!bg-gray-200 dark:hover:!bg-dark transition-all duration-300"
        >
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(pres.patient?.name, 20)}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(pres.doctor?.name, 15)}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {pres.clinic.name}
          </TableCell>

          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {pres.date}
          </TableCell>
          <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium text-nowrap">
            {truncateText(pres.note!, 20) || "لا يوجد"}
          </TableCell>

          {(canUpdatePrescription ||
            canDeletePrescription ||
            canViewPrescription) && (
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                {canViewPrescription && (
                  <TooltipButton title="عرض">
                    <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                      <Link
                        to={`/dashboard/prescriptions/${pres.id}`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                      >
                        <Eye size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canViewPrescription && (
                  <PrintPrescriptionReceipt prescription={pres} />
                )}

                {canUpdatePrescription && (
                  <TooltipButton title="تعديل">
                    <Button className="h-auto py-0 px-0 bg-primary gap-2 text-sm bg-blue-600 hover:bg-blue-700">
                      <Link
                        to={`/dashboard/prescriptions/${pres.id}/update`}
                        className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9 text-white"
                      >
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </TooltipButton>
                )}
                {canDeletePrescription && (
                  <DeletePrescription
                    name={pres.patient?.name}
                    id={pres.id.toString()}
                  />
                )}
              </div>
            </TableCell>
          )}
        </motion.tr>
      ))}
    </>
  );
};

export default PrescriptionsList;
