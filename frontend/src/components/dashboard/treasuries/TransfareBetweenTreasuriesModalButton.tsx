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
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import RenderFormFields from "@/components/forms/RenderFormFields";
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
} from "@/lib/react-query/treasuries";

const TransferBetweenTreasuriesButton = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { data: treasuries } = useGetAllTreasuries({ token });
  const { mutateAsync: transferTreasury, isPending } = useTransferTreasuries();

  const treasuriesOptions = treasuries?.data.map((treasury) => ({
    value: treasury?.id.toString(),
    label: treasury?.name,
  }));
  const form = useForm<z.infer<typeof transferTreasurySchema>>({
    resolver: zodResolver(transferTreasurySchema),
  });

  const onSubmit = async ({
    from_treasury,
    to_treasury,
  }: z.infer<typeof transferTreasurySchema>) => {
    try {
      const { status, message } = await transferTreasury({
        token,
        from_treasury: from_treasury.value,
        to_treasury: to_treasury.value,
      });

      // ! Transfer failed
      if (!status) return toast.error(message);

      // * Transfer Success
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
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({});
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"sm"}
        className="md:w-28 bg-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-[1.4rem] !rounded-lg font-semibold"
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
                <RenderFormFields
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
