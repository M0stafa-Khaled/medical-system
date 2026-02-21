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
import BookingStatus from "./BookingStatus";
import { TBookingStatus } from "@/shared/types";
import { toast } from "react-toastify";
import { useUpdateBookingStatus } from "@/features/dashboard/bookings/queriesAndMutations";
import { IBooking } from "@/features/dashboard/bookings/types";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { handleResErr } from "@/shared/utils/handleResError";
import { BOOKING_STATUS_OPTIONS } from "../constants";

interface IProps {
  booking: IBooking;
}

export const UpdateBookingStatus = ({ booking }: IProps) => {
  const canUpdateBookingStatus = useHasPermission(
    PERMISSIONS.UPDATE_BOOKING_STATUS
  );
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { mutateAsync: updateBookingStatus } = useUpdateBookingStatus();

  const submit = async (bookingStatus: TBookingStatus) => {
    if (bookingStatus === booking.status) return;

    try {
      const { status, message } = await updateBookingStatus({
        id: booking.id,
        status: bookingStatus,
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

          <PopoverContent className="bg-card z-1000 w-62.5 p-0">
            <Command>
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
                      className="cursor-pointer py-2.5"
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
