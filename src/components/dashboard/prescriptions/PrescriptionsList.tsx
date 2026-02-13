import { TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/animations";
import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/hooks/useHasPermission";
import truncateText from "@/utils/truncateText";
import TooltipButton from "@/components/ui/TooltipButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
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
        className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
      >
        <TableCell
          colSpan={6}
          className="py-5 text-center text-sm font-medium text-black dark:text-white"
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
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(pres.patient?.name, 20)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(pres.doctor?.name, 15)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {pres.clinic.name}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {pres.date}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(pres.note!, 20) || "لا يوجد"}
          </TableCell>

          {(canUpdatePrescription ||
            canDeletePrescription ||
            canViewPrescription) && (
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2">
                {canViewPrescription && (
                  <TooltipButton title="عرض">
                    <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                      <Link
                        to={`/dashboard/prescriptions/${pres.id}`}
                        className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
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
                    <Button className="h-auto gap-2 bg-blue-600 px-0 py-0 text-sm hover:bg-blue-700">
                      <Link
                        to={`/dashboard/prescriptions/${pres.id}/update`}
                        className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1 text-white"
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
