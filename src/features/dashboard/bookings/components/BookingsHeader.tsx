import { PERMISSIONS } from "@/shared/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import useHasPermission from "@/shared/hooks/useHasPermission";
import BookingsFilters from "./BookingsFilters";
import { Eraser } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";
import RefetchDataButton from "@/shared/components/RefetchDataButton";
import Query_Keys from "@/shared/enums/queryKeys";

interface IProps {
  isLoading: boolean;
}

export const BookingsHeader = ({ isLoading }: IProps) => {
  const canCreateBooking = useHasPermission(PERMISSIONS.ADD_BOOKING);
  const [_, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
          {canCreateBooking && (
            <Button asChild size={"lg"} className="dark:btn-primary">
              <Link to={"/dashboard/bookings/create"}>
                إضافة حجز جديد
                <FiPlus size={20} />
              </Link>
            </Button>
          )}
          <div className="text-lg font-semibold">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <div className="flex gap-2">
          <RefetchDataButton
            isLoading={isLoading}
            queryKey={Query_Keys.GET_ALL_BOOKINGS}
          />
          <Button onClick={handleClearFilters} size={"lg"}>
            <Eraser className="h-4 w-4" />
            مسح الفلاتر
          </Button>
        </div>
      </div>
      <BookingsFilters />
    </div>
  );
};
