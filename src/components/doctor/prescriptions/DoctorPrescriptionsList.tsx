import { TableCell } from "@/shared/components/ui/table";
import { motion } from "framer-motion";
import { tableRowVariants } from "@/shared/animations";
import truncateText from "@/shared/utils/truncateText";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";
import { Eye, Pen } from "lucide-react";
import DoctorDeletePrescription from "./DeleteDoctorPrescription";
import { IPrescription } from "@/features/dashboard/prescriptions/types";

interface IProps {
  prescriptions: IPrescription[];
}
const DoctorPrescriptionsList = ({ prescriptions }: IProps) => {
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
      {prescriptions?.map(({ id, clinic, date, note, patient }, index) => (
        <motion.tr
          key={id}
          initial="hidden"
          animate="visible"
          custom={index}
          variants={tableRowVariants}
          className="dark:border-muted dark:bg-dark/40! dark:hover:bg-dark! bg-white/40! transition-all duration-300 hover:bg-gray-200!"
        >
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(patient?.name, 20)}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {clinic.name}
          </TableCell>

          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {date}
          </TableCell>
          <TableCell className="py-3 text-center text-sm font-medium text-nowrap text-black dark:text-white">
            {truncateText(note!, 20) || "لا يوجد"}
          </TableCell>

          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2">
              <TooltipButton title="عرض">
                <Button className="bg-primary h-auto gap-2 px-0 py-0 text-sm text-white dark:text-black">
                  <Link
                    to={`/doctor/prescriptions/${id}`}
                    className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1"
                  >
                    <Eye size={20} />
                  </Link>
                </Button>
              </TooltipButton>
              <TooltipButton title="تعديل">
                <Button className="bg-primary h-auto gap-2 bg-blue-600 px-0 py-0 text-sm hover:bg-blue-700">
                  <Link
                    to={`/doctor/prescriptions/${id}/update`}
                    className="flex h-9 w-9 items-center justify-center gap-2 px-1 py-1 text-white"
                  >
                    <Pen size={20} />
                  </Link>
                </Button>
              </TooltipButton>
              <DoctorDeletePrescription
                name={patient?.name}
                id={id.toString()}
              />
            </div>
          </TableCell>
        </motion.tr>
      ))}
    </>
  );
};

export default DoctorPrescriptionsList;
