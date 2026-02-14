import { memo, useEffect, useState } from "react";
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
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { createTreasurySchema } from "@/validations/dashboard/treasurySchema";
import { ITreasury } from "@/interfaces/dashboard/treasury";
import { useUpdateTreasury } from "@/shared/lib/react-query/dashboard/treasuries";
import { TREASURY_FORM_INPUTS } from "@/constants";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import RenderTreasuryFormFields from "@/components/forms/dashboard/treasuries/RenderTreasuryFormFields";

interface IProps {
  treasury: ITreasury;
}

const UpdateTreasury = ({ treasury }: IProps) => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateTreasury, isPending } = useUpdateTreasury();

  const form = useForm<z.infer<typeof createTreasurySchema>>({
    resolver: zodResolver(createTreasurySchema),
    defaultValues: {
      name: treasury.name,
      status: treasury.status,
    },
  });

  const onSubmit = async ({
    name,
    status,
  }: z.infer<typeof createTreasurySchema>) => {
    try {
      const { status: serverStatus, message } = await updateTreasury({
        id: `${treasury.id}`,
        token,
        status,
        name,
      });

      // ! Update failed
      if (!serverStatus) return toast.error(message);

      // * Update Success
      return toast.success(message || "تم تحديث بيانات الخزينة بنجاح");
    } catch (error) {
      handleResErr(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      name: treasury.name,
    });
  };
  useEffect(() => {
    form.reset({
      name: treasury.name,
      status: treasury.status,
    });
  }, [form, treasury]);

  return (
    <>
      <TooltipButton title="تعديل">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="h-8 w-8 gap-2 bg-blue-600 px-1 py-1 text-sm text-white hover:bg-blue-700"
        >
          <Pen size={20} />
        </Button>
      </TooltipButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل تصنيف"
        description={{
          text: "يمكنك تعديل التصنيف المحدد هنا",
        }}
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
            {TREASURY_FORM_INPUTS.map((input, idx) => (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderTreasuryFormFields
                  input={input}
                  form={form}
                  schema={createTreasurySchema}
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
                تعديل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default memo(UpdateTreasury);
