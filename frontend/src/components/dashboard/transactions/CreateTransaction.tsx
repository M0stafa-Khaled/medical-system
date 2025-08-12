import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Wallet } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { PAYMENT_METHODS, TRANSACTION_FORM_INPUTS } from "@/constants";
import { createTransactionSchema } from "@/validations/dashboard/transactionSchema";
import { useCreateTransaction } from "@/lib/react-query/dashboard/transactions/transactions";
import RenderTransactionFormFields from "@/components/forms/dashboard/transactions/RenderTransactionFormFields";
import { TPaymentMethod } from "@/types";
import TooltipButton from "@/components/ui/TooltipButton";
import { Link } from "react-router-dom";
import { IBooking } from "@/interfaces/dashboard/bookings";
import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";
import handleResErr from "@/utils/handleResponseError";
import { useGetPatientBalances } from "@/lib/react-query/dashboard/transactions/patientBalances";
import InfoField from "../../shared/InfoField";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { numberToPrice } from "@/utils/numberToPrice";

interface IProps {
  booking: IBooking;
}
const CreateTransaction = ({ booking }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVisa, setShowVisa] = useState(false);
  const canViewLastVisits = useHasPermission(
    PERMISSIONS.LAST_PATIENT_TRANSACTIONS
  );
  const token = cookieServices.getToken()!;

  const { data: doctorActions } = useGetDoctorActions({
    doctorId: isOpen ? booking.doctor.id.toString() : "",
    token,
  });

  const { data: patientBalances } = useGetPatientBalances({
    patientId: isOpen ? booking.patient.id.toString() : "",
    token,
  });

  const doctorActionsOptions = doctorActions?.data?.map((action) => ({
    value: action.id.toString(),
    label: `${action.name} - ${action.price} جنيه`,
  }));

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      price: 0,
      doctor_actions: [],
      payment_method: "cash",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "payment_method") {
        setShowVisa(value.payment_method === "visa");
      }
      if (name === "doctor_actions") {
        const selectedActions = value.doctor_actions?.map((action) =>
          doctorActions?.data.find((a) => a.id.toString() === action)
        );
        const totalPrice = selectedActions?.reduce((total, action) => {
          return total + (action?.price || 0);
        }, 0);
        form.setValue("price", totalPrice!);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, doctorActions?.data]);

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    if (showVisa) {
      if (!data.visa_code) return toast.warn("ادخل رقم عملية البطاقة البنكية");
    }
    try {
      const { message, status } = await createTransaction({
        token,
        dataForm: {
          booking_id: booking.id.toString(),
          contract_type: "egyption",
          doctor_actions: data.doctor_actions,
          payment_method: data.payment_method as TPaymentMethod,
          price: data.price,
        },
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      handleCloseModal();
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <TooltipButton title="تحصيل">
        <Button
          onClick={() => setIsOpen(true)}
          className="gap-2 text-sm  py-1 px-1 w-9 h-9"
        >
          <Wallet size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تحصيل"
        description={{
          text: `تحصيل من حجز قم ${booking.code} للمريض ${booking.patient.name}`,
          color: "text-black dark:text-white",
        }}
        showFooter={false}
        maxWidth="lg"
      >
        {canViewLastVisits && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1"
          >
            <InfoField
              label="الإجمالي"
              value={numberToPrice(
                patientBalances?.data.total_amount_due as number
              )}
            />
            <InfoField
              label="إجمالي المدفوع"
              value={numberToPrice(
                patientBalances?.data.total_amount_paid as number
              )}
            />
            <InfoField
              label="إجمالي المسترد"
              value={numberToPrice(
                patientBalances?.data.refund_amount as number
              )}
            />
            <InfoField
              label="إجمالي الباقي"
              value={patientBalances?.data.total_balance as string}
            />
          </motion.div>
        )}
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-black dark:text-white"
          >
            <Button className="h-auto w-full py-0 px-0 gap-2 text-sm ">
              <Link
                to={`/dashboard/last-visits/${booking.patient.id}/transactions/${booking.doctor.id}`}
                target="_blank"
                className="flex justify-center items-center gap-2 py-3 px-1 w-full"
              >
                أخر زيارات المريض لدي الطبيب
              </Link>
            </Button>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"
            >
              {TRANSACTION_FORM_INPUTS.map((input, idx) =>
                input.name === "visa_code" && !showVisa ? null : (
                  <motion.div
                    variants={itemVariants}
                    key={input.name}
                    custom={idx}
                    className={`${
                      input.name === "doctor_actions" ||
                      (input.name === "price" && showVisa)
                        ? "md:col-span-2"
                        : ""
                    }`}
                  >
                    <RenderTransactionFormFields
                      input={input}
                      form={form}
                      schema={createTransactionSchema}
                      options={{
                        paymentMethods: PAYMENT_METHODS,
                        doctorActions: doctorActionsOptions!,
                      }}
                    />
                  </motion.div>
                )
              )}
            </motion.div>

            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-2.5 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
              >
                تحصيل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTransaction;
