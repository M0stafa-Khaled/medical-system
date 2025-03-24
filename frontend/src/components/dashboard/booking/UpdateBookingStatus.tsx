import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BOOKING_STATUS_OPTIONS } from "@/constants";
import BookingStatus from "./BookingStatus";
import { TBookingStatus } from "@/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUpdateBookingStatus } from "@/lib/react-query/dashboard/bookings";
import cookieServices from "@/utils/cookieServices";
import { IBooking } from "@/interfaces/dashboard/bookings";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

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
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
        message: string;
      }>;
      if (errorObj?.response?.data.errors) {
        Object.keys(errorObj.response.data.errors).forEach((key) => {
          errorObj?.response?.data.errors[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (
        errorObj?.response?.data.message &&
        !errorObj?.response?.data.errors
      ) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
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
              className="p-0 bg-transparent border-0 hover:bg-transparent m-0 shadow-none"
            >
              <BookingStatus status={booking?.status} />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 z-[1000] border-black/20 dark:border-white/40">
            <Command className="text-black dark:text-white bg-foreground">
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
                      className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20"
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
