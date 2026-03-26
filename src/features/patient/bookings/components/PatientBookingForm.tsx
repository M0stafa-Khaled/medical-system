import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Form, FormField } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CalendarPlus2, Loader2 } from "lucide-react";
import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useGetDoctorActions } from "@/features/dashboard/doctors";
import { useGetAllWorkingDays } from "@/features/dashboard/doctors/working-days";
import { useGetAllClinicDoctors, useGetAvailableBookingsTime } from "@/shared";
import { handleResErr } from "@/shared/utils/handleResError";
import { toast } from "react-toastify";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { patientBookingSchema } from "../schema";
import {
  useCreatePatientBooking,
  useUpdatePatientBooking,
} from "../queriesAndMutations";
import { IPatientBooking } from "../types";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import BookingDateItem from "@/shared/components/formItems/BookingDateItem";
import convertDay from "@/shared/utils/convertDayLang";

type FormValues = z.infer<typeof patientBookingSchema>;

export const PatientBookingForm = ({
  mode,
  booking,
}: {
  mode: "create" | "update";
  booking?: IPatientBooking;
}) => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(patientBookingSchema),
    defaultValues: {
      clinic_id: booking?.clinic?.id?.toString() || "",
      doctor_id: booking?.doctor?.id?.toString() || "",
      working_day_id: booking?.working_day?.id?.toString() || "",
      doctor_action_id: booking?.action?.id?.toString() || "",
      date: booking?.booking_date || "",
      start_at: booking?.start_at || "",
    },
  });

  const clinicId = useWatch({ control: form.control, name: "clinic_id" });
  const doctorId = useWatch({ control: form.control, name: "doctor_id" });
  const workingDayId = useWatch({
    control: form.control,
    name: "working_day_id",
  });
  const bookingDate = useWatch({ control: form.control, name: "date" });

  const { data: clinics } = useGetAllClinics({ filter: { status: "1" } });
  const { data: doctors } = useGetAllClinicDoctors({
    clinic_id: clinicId || "",
  });
  const { data: doctorActions } = useGetDoctorActions({
    doctorId: doctorId || "",
  });
  const { data: workingDays } = useGetAllWorkingDays({
    doctorId: doctorId || "",
  });
  const { data: availableTimes } = useGetAvailableBookingsTime({
    doctor_id: doctorId || "",
    working_day_id: workingDayId || "",
    clinic_id: clinicId || "",
    booking_date: bookingDate || "",
  });

  useEffect(() => {
    if (mode !== "update" || !booking) return;
    form.reset({
      clinic_id: booking.clinic.id.toString(),
      doctor_id: booking.doctor.id.toString(),
      working_day_id: booking.working_day.id.toString(),
      doctor_action_id: booking.action.id.toString(),
      date: booking.booking_date,
      start_at: booking.start_at,
    });
  }, [booking, form, mode]);

  useEffect(() => {
    if (!clinicId) return;
    form.setValue("doctor_id", "");
    form.setValue("working_day_id", "");
    form.setValue("doctor_action_id", "");
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [clinicId, form]);

  useEffect(() => {
    if (!doctorId) return;
    form.setValue("working_day_id", "");
    form.setValue("doctor_action_id", "");
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [doctorId, form]);

  useEffect(() => {
    if (!workingDayId) return;
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [workingDayId, form]);

  useEffect(() => {
    if (!bookingDate) return;
    form.setValue("start_at", "");
  }, [bookingDate, form]);

  const clinicsOptions =
    clinics?.data?.map((clinic) => ({
      value: clinic.id.toString(),
      label: clinic.name,
    })) || [];

  const doctorsOptions =
    doctors?.data?.map((doctor) => ({
      value: doctor.id.toString(),
      label: doctor.name,
    })) || [];

  const workingDaysOptions =
    workingDays?.data?.map((day) => ({
      value: day.id.toString(),
      label: `${convertDay(day.day, "en")} بداية من ${day.start_at} الي ${day.end_at}`,
    })) || [];

  const actionsOptions =
    doctorActions?.data?.map((action) => ({
      value: action.id.toString(),
      label: `${action.name} - ${numberToPrice(action.price)}`,
    })) || [];

  const timeOptions = useMemo(
    () => availableTimes?.data || [],
    [availableTimes]
  );

  const { mutateAsync: createBooking, isPending: isCreating } =
    useCreatePatientBooking();
  const { mutateAsync: updateBooking, isPending: isUpdating } =
    useUpdatePatientBooking();
  const isSaving = isCreating || isUpdating;

  const onSubmit = async (values: FormValues) => {
    try {
      if (mode === "update" && booking) {
        const response = await updateBooking({
          id: booking.id.toString(),
          ...values,
        });

        if (!response.status) {
          toast.error(response.message || "فشل في تحديث الحجز");
          return;
        }

        toast.success(response.message || "تم تحديث الحجز بنجاح");
      } else {
        const response = await createBooking(values);

        if (!response.status) {
          toast.error(response.message || "فشل في إنشاء الحجز");
          return;
        }

        toast.success(response.message || "تم إنشاء الحجز بنجاح");
      }

      navigate("/patient/bookings");
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarPlus2 size={20} />
          {mode === "update" ? "تعديل الحجز" : "إنشاء حجز جديد"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clinic_id"
                render={({ field }) => (
                  <SelectFormItem
                    field={field}
                    input={{
                      name: "clinic_id",
                      label: "العيادة",
                      type: "select",
                      placeholder: "اختر العيادة",
                    }}
                    options={clinicsOptions}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="doctor_id"
                render={({ field }) => (
                  <SelectFormItem
                    field={field}
                    input={{
                      name: "doctor_id",
                      label: "الطبيب",
                      type: "select",
                      placeholder: "اختر الطبيب",
                    }}
                    options={doctorsOptions}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="doctor_action_id"
                render={({ field }) => (
                  <SelectFormItem
                    field={field}
                    input={{
                      name: "doctor_action_id",
                      label: "الخدمة",
                      type: "select",
                      placeholder: "اختر الخدمة",
                    }}
                    options={actionsOptions}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="working_day_id"
                render={({ field }) => (
                  <SelectFormItem
                    field={field}
                    input={{
                      name: "working_day_id",
                      label: "يوم العمل",
                      type: "select",
                      placeholder: "اختر يوم العمل",
                    }}
                    options={workingDaysOptions}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <BookingDateItem
                    field={field as any}
                    input={{
                      name: "date",
                      label: "تاريخ الحجز",
                      type: "date",
                      placeholder: "اختر تاريخ الحجز",
                    }}
                    allowedDay={
                      workingDays?.data?.find(
                        (day) => day.id.toString() === workingDayId
                      )?.day || ""
                    }
                  />
                )}
              />

              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <SelectFormItem
                    field={field}
                    input={{
                      name: "start_at",
                      label: "الوقت",
                      type: "select",
                      placeholder: "اختر الوقت",
                    }}
                    options={timeOptions.map((time) => ({
                      value: time,
                      label: time,
                    }))}
                  />
                )}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                className="from-primary to-primary/80 bg-linear-to-r"
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "update" ? "حفظ التعديلات" : "إنشاء الحجز"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/patient/bookings")}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
