import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { handleResErr } from "@/shared/utils/handleResError";
import { useState } from "react";
import { createTreasurySchema } from "../schema";
import { RenderTreasuryFormFields } from "./RenderTreasuryFormFields";
import { useCreateTreasury } from "../queriesAndMutations";
import { TREASURY_FORM_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CreateTreasury = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createTreasury, isPending } = useCreateTreasury();

  const form = useForm<z.infer<typeof createTreasurySchema>>({
    resolver: zodResolver(createTreasurySchema),
    defaultValues: {
      name: "",
      status: true,
    },
  });

  const onSubmit = async ({
    name,
    status,
  }: z.infer<typeof createTreasurySchema>) => {
    try {
      const { status: serverStatus, message } = await createTreasury({
        name,
        status,
      });

      // ! Create failed
      if (!serverStatus) return toast.error(message);

      // * Create Success
      return toast.success(message || "تم إضافة خزينة بنجاح");
    } catch (error) {
      handleResErr(error);
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
      <Button
        onClick={() => setIsOpen(true)}
        size="default"
        className="flex-1 bg-linear-to-r from-yellow-600 to-amber-600 text-white shadow-md hover:shadow-lg sm:flex-none"
      >
        <FiPlus size={18} />
        <span className="hidden sm:inline">إضافة خزينة</span>
        <span className="sm:hidden">إضافة</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة خزينة جديدة"
        description={{ text: "يمكنك اضافة خزينة جديدة من هنا" }}
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
                إضافة
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
