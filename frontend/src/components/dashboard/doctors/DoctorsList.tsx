import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { IDoctor } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DeleteDoctorButton from "./DeleteClinicModalButton";
import { FaPencil } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";

interface IProps {
  doctors: IDoctor[];
}
const DoctorsList = ({ doctors }: IProps) => {
  return (
    <>
      {!doctors.length ? (
        <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
          <TableCell
            colSpan={7}
            className="text-sm text-center text-black dark:text-white py-5 font-medium"
          >
            لا يوجد اطباء
          </TableCell>
        </TableRow>
      ) : (
        doctors.map(({ id, name, status, image, first_phone }) => (
          <TableRow
            key={id}
            className="dark:border-muted bg-white/20 dark:bg-dark/40 dark:hover:bg-dark transition-all duration-300"
          >
            <TableCell className="flex justify-center items-center text-sm text-center text-black dark:text-white py-3 font-medium">
              <img
                src={image || "/avatar.svg"}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {name}
            </TableCell>
            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              {first_phone}
            </TableCell>

            <TableCell className="text-sm text-center text-black dark:text-white py-3 font-medium">
              <Badge className="bg-green-500 hover:bg-green-500">
                {status ? "متاح" : "غير متاح"}
              </Badge>
            </TableCell>

            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-3">
                <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm ">
                  <Link
                    to={`/dashboard/doctors/${id}`}
                    className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9"
                  >
                    <FiEye size={24} />
                  </Link>
                </Button>
                <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                  <Link
                    to={`/dashboard/doctors/update/${id}`}
                    className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                  >
                    <FaPencil size={18} />
                  </Link>
                </Button>

                <DeleteDoctorButton name={name} id={id} />
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default DoctorsList;
