import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { CalendarIcon } from "lucide-react";
import cookieServices from "@/shared/utils/cookieServices";
import { format } from "date-fns";
import { IPrescriptionsFilter } from "@/features/dashboard/prescriptions/types";
import { useGetDoctorClinics } from "@/shared/lib/react-query/doctor/doctorClinics";

interface IProps {
  filters: IPrescriptionsFilter;
  setFilters: (filters: IPrescriptionsFilter) => void;
}
const DoctorPrescriptionsFilters = ({ filters, setFilters }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: clinics } = useGetDoctorClinics(token);

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />
      {/* Clinic */}
      <Select
        value={filters.clinic}
        onValueChange={(value) => handleFilterChange("clinic", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.clinic ? "" : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="العيادة"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          {clinics?.data?.map((clinic) => (
            <SelectItem
              key={clinic.name}
              value={clinic.name.trim()}
              className="cursor-pointer py-2.5"
            >
              {clinic.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Created Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.date ? (
              format(new Date(filters.date), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">تاريخ إصدار الروشتة</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-foreground w-full border-black/20 p-0 px-3 dark:border-white/40"
          align="start"
        >
          <Calendar
            mode="single"
            dir="rtl"
            selected={filters.date ? new Date(filters.date) : undefined}
            onSelect={(date) =>
              handleFilterChange(
                "date",
                date
                  ? new Date(date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : null
              )
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DoctorPrescriptionsFilters;
