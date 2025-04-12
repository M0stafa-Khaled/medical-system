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
import { Loader2, Plus } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { PATIENT_PAYMENT_FORM_INPUTS, PAYMENT_METHODS } from "@/constants";
import RenderTransactionFormFields from "@/components/forms/dashboard/transactions/RenderTransactionFormFields";
import handleResErr from "@/utils/handleResponseError";
import {
  useCreatePatientPayment,
  useGetPatientBalances,
} from "@/lib/react-query/dashboard/transactions/patientBalances";
import { createPatientPaymentSchema } from "@/validations/transactionSchema";
import InfoField from "../InfoField";

const CreatePatientPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVisa, setShowVisa] = useState(false);
  const [patientId, setPatientId] = useState<string | undefined>("");
  const token = cookieServices.getToken()!;

  const { mutateAsync: createPatientPayment, isPending } =
    useCreatePatientPayment();

  const form = useForm<z.infer<typeof createPatientPaymentSchema>>({
    resolver: zodResolver(createPatientPaymentSchema),
    defaultValues: {
      amount: 0,
      payment_method: "cash",
      transaction_code: "",
      visa_code: "0",
      patient_id: "",
    },
  });

  const { data: patientBalances, isLoading } = useGetPatientBalances({
    patientId: isOpen && patientId ? patientId?.toString() : "",
    token,
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "payment_method") {
        setShowVisa(value.payment_method === "visa");
      }
      if (name === "patient_id") {
        setPatientId(value.patient_id);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async ({
    amount,
    payment_method,
    visa_code,
    transaction_code,
  }: z.infer<typeof createPatientPaymentSchema>) => {
    if (showVisa) {
      if (!visa_code) return toast.warn("ادخل رقم عملية البطاقة البنكية");
    }
    try {
      const { message, status } = await createPatientPayment({
        token,
        patientId: patientId!,
        transaction: {
          transaction_code: transaction_code,
          amount,
          payment_method: payment_method,
          ...(visa_code ? { visa_code } : {}),
        },
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      amount: 0,
      patient_id: "",
      payment_method: "cash",
      transaction_code: "",
      visa_code: "",
    });
    setPatientId("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 h-auto py-3"
      >
        إضافة دفعة من مريض
        <Plus size={20} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تحصيل"
        description={{
          text: `إضافة دفعة من مريض`,
        }}
        showFooter={false}
      >
        {patientId ? (
          isLoading ? (
            <Loader2
              className="animate-spin mx-auto text-dark dark:text-white"
              size={20}
            />
          ) : (
            <motion.div variants={containerVariants} className="space-y-2">
              <motion.h4
                variants={itemVariants}
                className="text-dark dark:text-white"
              >
                تحصيلات المريض السابقة:
              </motion.h4>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1"
              >
                <InfoField
                  label="إجمالي المبلغ"
                  value={patientBalances?.data.total_amount_due as number}
                />
                <InfoField
                  label="إجمالي المبلغ المدفوع"
                  value={patientBalances?.data.total_amount_paid as number}
                />
                <InfoField
                  label="إجمالي المبلغ المسترد"
                  value={patientBalances?.data.refund_amount as number}
                />
                <InfoField
                  label="إجمالي المبلغ المستحق"
                  value={patientBalances?.data.total_balance as string}
                />
              </motion.div>
            </motion.div>
          )
        ) : null}
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-black dark:text-white"
          >
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"
            >
              {PATIENT_PAYMENT_FORM_INPUTS.map((input, idx) =>
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
                      schema={createPatientPaymentSchema}
                      options={{
                        paymentMethods: PAYMENT_METHODS,
                      }}
                      patientId={patientId!}
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

export default CreatePatientPayment;
