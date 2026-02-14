import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { BOOKING_STATUS_OPTIONS } from "@/constants";
import BookingStatus from "./BookingStatus";
import { TBookingStatus } from "@/shared/types";
import { toast } from "react-toastify";
import { useUpdateBookingStatus } from "@/shared/lib/react-query/dashboard/bookings";
import cookieServices from "@/shared/utils/cookieServices";
import { IBooking } from "@/interfaces/dashboard/bookings";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { handleResErr } from "@/shared/utils/handleResError";

interface IProps {
  booking: IBooking;
}

const UpdateBookingStatus = ({ booking }: IProps) => {
  const canUpdateBookingStatus = useHasPermission(
    PERMISSIONS.UPDATE_BOOKING_STATUS
  );
  const token = cookieServices.getToken()!;
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { mutateAsync: updateBookingStatus } = useUpdateBookingStatus();

  const submit = async (bookingStatus: TBookingStatus) => {
    if (bookingStatus === booking.status) return;

    try {
      const { status, message } = await updateBookingStatus({
        id: booking.id,
        status: bookingStatus,
        token,
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success("تم تحديث حالة الحجز بنجاح");
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleStatusChange = (currentValue: string) => {
    submit(currentValue as TBookingStatus);
    setOpen(false);
  };
  return (
    <>
      {canUpdateBookingStatus ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="patient_id"
              role="combobox"
              aria-expanded={open}
              className="m-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent"
            >
              <BookingStatus status={booking?.status} />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="z-1000 w-62.5 border-black/20 p-0 dark:border-white/40">
            <Command className="bg-foreground text-black dark:text-white">
              <CommandInput
                placeholder="اختر او ابحث"
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>لا يوجد</CommandEmpty>
                <CommandGroup>
                  {BOOKING_STATUS_OPTIONS?.map((option) => (
                    <CommandItem
                      className="cursor-pointer py-2.5 text-black hover:bg-blue-200/20 dark:text-white"
                      key={option.label}
                      value={option.value}
                      onSelect={handleStatusChange}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          booking?.status === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <BookingStatus status={booking?.status} />
      )}
    </>
  );
};

export default UpdateBookingStatus;
