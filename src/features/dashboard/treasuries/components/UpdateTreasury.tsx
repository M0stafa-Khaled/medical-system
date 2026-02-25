import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { ITreasury } from "../types";
import { useUpdateTreasury } from "../queriesAndMutations";
import { createTreasurySchema } from "../schema";
import { RenderTreasuryFormFields } from "./RenderTreasuryFormFields";
import { TREASURY_FORM_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

interface IProps {
  treasury: ITreasury;
}

export const UpdateTreasury = ({ treasury }: IProps) => {
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
          size={"icon"}
          className="btn-edit rounded-full"
        >
          <Pen />
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
            className="space-y-4"
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

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                تعديل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
