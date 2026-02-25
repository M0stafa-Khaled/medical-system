import SearchInput from "@/shared/components/ui/SearchInput";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const DoctorBookingsHeader = () => {
  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="text-lg font-semibold">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
        </div>

        <SearchInput placeholder="ابحث باسم المريض" />
      </div>
    </div>
  );
};

export default DoctorBookingsHeader;
