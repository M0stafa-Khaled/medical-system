import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import EditClinicModalButton from "./EditClinicModalButton";
import DeleteClinicButton from "./DeleteClinicModalButton";
import { IClinic } from "@/interfaces";

interface IProps {
  clinics: IClinic[];
}
const ClinicsList = ({ clinics }: IProps) => {
  return (
    <>
      {!clinics.length ? (
        <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
          <TableCell
            colSpan={3}
            className="text-sm text-center text-black dark:text-white py-5 font-medium"
          >
            لا يوجد عيادات
          </TableCell>
        </TableRow>
      ) : (
        clinics.map(({ id, name, status }) => (
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
              <div className="flex justify-center items-center gap-4">
                <EditClinicModalButton name={name} id={id} status={status} />
                <DeleteClinicButton name={name} id={id} />
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default ClinicsList;
