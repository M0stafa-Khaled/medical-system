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
import { useUpdateBooking } from "@/lib/react-query/dashboard/bookings";
import cookieServices from "@/utils/cookieServices";

interface IProps {
  status: TBookingStatus;
  clinic_name: string;
  doctor_id: string;
  working_day_id: string;
  patient_id: string;
  id: string;
}

const UpdateBookingStatus = ({
  status,
  clinic_name,
  doctor_id,
  working_day_id,
  patient_id,
  id,
}: IProps) => {
  const token = cookieServices.getToken()!;
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { mutateAsync: updateBooking } = useUpdateBooking();

  const submit = async (bookingStatus: TBookingStatus) => {
    try {
      const { status, message } = await updateBooking({
        formData: {
          clinic_name: clinic_name,
          doctor_id: doctor_id,
          patient_id: patient_id,
          working_day_id: working_day_id,
          status: bookingStatus!,
        },
        id,
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
    submit(currentValue as TBookingStatus)
    setOpen(false);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="patient_id"
            role="combobox"
            aria-expanded={open}
            className={`p-0 bg-transparent border-0 hover:bg-transparent m-0`}
          >
            <BookingStatus status={status} />
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
                        status === option.value ? "opacity-100" : "opacity-0"
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
    </>
  );
};

export default UpdateBookingStatus;
