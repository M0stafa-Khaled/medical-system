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
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { createTreasurySchema } from "@/validations/dashboard/treasurySchema";
import { useCreateTreasury } from "@/lib/react-query/dashboard/treasuries";
import { TREASURY_FORM_INPUTS } from "@/constants";
import handleResErr from "@/utils/handleResponseError";
import RenderTreasuryFormFields from "@/components/forms/dashboard/treasuries/RenderTreasuryFormFields";

const CreateTreasury = () => {
  const token = cookieServices.getToken()!;
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
        token,
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
        className="flex items-center gap-2 h-auto py-3"
      >
        إضافة خزينة
        <FiPlus size={20} />
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

            <AlertDialogFooter className="text-start justify-start! gap-2">
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
                إضافة
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default memo(CreateTreasury);
