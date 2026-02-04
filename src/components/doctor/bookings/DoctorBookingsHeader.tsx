import SearchInput from "@/components/ui/SearchInput";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const DoctorBookingsHeader = () => {
  return (
    <div className="space-y-4 mb-4">
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="text-lg font-semibold text-black dark:text-white">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
        </div>

        <SearchInput placeholder="ابحث باسم المريض" />
      </div>
    </div>
  );
};

export default DoctorBookingsHeader;
