import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Plus } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { PAYMENT_METHODS } from "@/shared/constants";
import { handleResErr } from "@/shared/utils/handleResError";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import {
  useCreatePatientPayment,
  useGetPatientBalances,
} from "../../patients/balances";
import InfoField from "@/shared/components/InfoField";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { createPatientPaymentSchema } from "../schema";
import { RenderTransactionFormFields } from "./RenderTransactionFormFields";
import { PATIENT_PAYMENT_FORM_INPUTS } from "../constants";

export const CreatePatientPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVisa, setShowVisa] = useState(false);
  const [patientId, setPatientId] = useState<string | undefined>("");

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
        size={"lg"}
        className="dark:btn-primary"
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
        maxWidth="2xl"
      >
        {patientId ? (
          isLoading ? (
            <Loader2 className="mx-auto animate-spin" size={20} />
          ) : (
            <motion.div variants={containerVariants} className="space-y-2">
              <motion.h4 variants={itemVariants}>
                تحصيلات المريض السابقة:
              </motion.h4>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-x-2 gap-y-1 md:grid-cols-2"
              >
                <InfoField
                  label="المبلغ الفعلي"
                  value={numberToPrice(
                    patientBalances?.data.total_amount_due as number
                  )}
                />
                <InfoField
                  label="إجمالي المبلغ المدفوع"
                  value={numberToPrice(
                    patientBalances?.data.total_amount_paid as number
                  )}
                />
                <InfoField
                  label="إجمالي المبلغ المسترد"
                  value={numberToPrice(
                    patientBalances?.data.refund_amount as number
                  )}
                />
                <InfoField
                  label="إجمالي المبلغ المستحق"
                  value={numberToPrice(
                    patientBalances?.data.total_balance as string
                  )}
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
            className="space-y-2"
          >
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2"
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

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                تحصيل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
