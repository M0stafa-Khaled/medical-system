import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { transferTreasurySchema } from "../schema";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TRANSFER_TREASURIES_FORM_INPUTS } from "@/constants";
import {
  useGetAllTreasuries,
  useTransferTreasuries,
} from "../queriesAndMutations";
import { RenderTreasuryFormFields } from "./RenderTreasuryFormFields";
import { handleResErr } from "@/shared/utils/handleResError";

export const TransferBetweenTreasuries = () => {
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
      from_treasury: "",
      to_treasury: "",
    },
  });

  const onSubmit = async ({
    from_treasury,
    to_treasury,
    amount,
  }: z.infer<typeof transferTreasurySchema>) => {
    try {
      const { status, message } = await transferTreasury({
        from_treasury,
        to_treasury,
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
      from_treasury: "",
      to_treasury: "",
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-auto gap-2 py-3 md:w-28"
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
                <RenderTreasuryFormFields
                  input={input}
                  form={form}
                  schema={transferTreasurySchema}
                  options={{ treasuries: treasuriesOptions! }}
                />
              </motion.div>
            ))}

            <AlertDialogFooter className="justify-start! gap-2 text-start">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="h-auto py-2.5 text-black dark:text-white"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تحويل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
