import { useState } from "react";
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
import { AxiosError } from "axios";
import { Loader2, Wallet } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { PaymentMethods, TRANSACTION_FORM_INPUTS } from "@/constants";
import transactionSchema from "@/validations/transactionSchema";
import { useCreateTransaction } from "@/lib/react-query/dashboard/transactions";
import RenderTransactionFormFields from "@/components/forms/dashboard/transactions/RenderTransactionFormFields";
import { TPaymentMethod } from "@/types";
import TooltipButton from "@/components/ui/TooltipButton";
import { Link } from "react-router-dom";
import { IBooking } from "@/interfaces/dashboard/bookings";
import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";

interface IProps {
  booking: IBooking;
}
const CreateTransaction = ({ booking }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);

  const { data: doctorActions } = useGetDoctorActions({
    doctorId: isOpen ? booking.doctor.id.toString() : "",
    token,
  });

  const doctorActionsOptions = doctorActions?.data?.map((action) => ({
    value: action.name,
    label: `${action.name} - ${action.price} جنيه`,
  }));

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      price: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    try {
      const { message, status } = await createTransaction({
        token,
        formData: {
          booking_id: booking.id,
          contract_type: "egyption",
          doctor_action_id: booking.action.id,
          payment_method: data.payment_method.value as TPaymentMethod,
          price: data.price,
        },
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success(message);
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
    } finally {
      handleCloseModal();
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
          text: `تحصيل من حجز قم ${booking.code}`,
        }}
        showFooter={false}
      >
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
                className="flex justify-center items-center gap-2 py-3 px-1 w-full"
              >
                أخر زيارات المريض لدي الطبيب
              </Link>
            </Button>

            <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm "></Button>
            {TRANSACTION_FORM_INPUTS.map((input, idx) => (
              <motion.div variants={itemVariants} key={input.name} custom={idx}>
                <RenderTransactionFormFields
                  input={input}
                  form={form}
                  schema={transactionSchema}
                  options={{
                    paymentMethods: PaymentMethods,
                    doctorActions: doctorActionsOptions!,
                  }}
                />
              </motion.div>
            ))}

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
