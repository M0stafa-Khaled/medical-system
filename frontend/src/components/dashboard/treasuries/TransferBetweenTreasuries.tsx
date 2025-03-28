import { memo, useState } from "react";
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
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import transferTreasurySchema from "@/validations/transferTreasurySchema";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TRANSFER_TREASURIES_FORM_INPUTS } from "@/constants";
import {
  useGetAllTreasuries,
  useTransferTreasuries,
} from "@/lib/react-query/dashboard/treasuries";
import RenderTransferBetweenTreasuriesFormFields from "@/components/forms/dashboard/expenses/RenderTransferBetweenTreasuriesFormFields";
import handleResErr from "@/utils/handleResponseError";

const TransferBetweenTreasuriesButton = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { data: treasuries } = useGetAllTreasuries({ token });
  const { mutateAsync: transferTreasury, isPending } = useTransferTreasuries();

  const treasuriesOptions = treasuries?.data?.map((treasury) => ({
    value: treasury?.id.toString(),
    label: treasury?.name,
  }));
  const form = useForm<z.infer<typeof transferTreasurySchema>>({
    resolver: zodResolver(transferTreasurySchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async ({
    from_treasury,
    to_treasury,
    amount,
  }: z.infer<typeof transferTreasurySchema>) => {
    try {
      const { status, message } = await transferTreasury({
        token,
        from_treasury: from_treasury.value,
        to_treasury: to_treasury.value,
        amount: amount,
      });

      // ! Transfer failed
      if (!status) return toast.error(message);

      // * Transfer Success
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
      from_treasury: {
        label: "",
        value: "",
      },
      to_treasury: {
        label: "",
        value: "",
      },
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="md:w-28 gap-2 h-auto py-3"
      >
        تحويل
        <FaMoneyBillTransfer size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تحويل أموال"
        description={{ text: "تحويل جميع الأموال إلي خزينة آخرى" }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {TRANSFER_TREASURIES_FORM_INPUTS.map((input, idx) => (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderTransferBetweenTreasuriesFormFields
                  input={input}
                  form={form}
                  schema={transferTreasurySchema}
                  options={{ treasuries: treasuriesOptions! }}
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
                تحويل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default memo(TransferBetweenTreasuriesButton);
