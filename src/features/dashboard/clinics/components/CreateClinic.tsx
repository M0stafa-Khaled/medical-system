import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { clinicSchema } from "../schema";
import { useCreateClinic } from "../queriesAndMutations";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { CLINIC_FORM_INPUTS } from "../constants";
import { handleResErr } from "@/shared/utils/handleResError";
import { RenderClinicsFormFields } from "./RenderClinicsFormFields";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CreateClinic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createClinic, isPending } = useCreateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      status: true,
      virtual_number: 0,
    },
  });

  const onSubmit = async ({
    name,
    status,
    virtual_number,
  }: z.infer<typeof clinicSchema>) => {
    try {
      const { status: statusServer, message } = await createClinic({
        name,
        status,
        virtual_number,
      });

      // ! Create failed
      if (!statusServer) return toast.error(message);

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
    form.reset();
  };

  const isOptionalField = (fieldName: string) => {
    const optionalFields = ["virtual_number"];

    return optionalFields.includes(fieldName);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="dark:btn-primary"
        size={"lg"}
      >
        إضافة عيادة جديدة
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة عيادة جديدة"
        description={{
          text: "يمكنك اضافة عيادة جديدة من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            {CLINIC_FORM_INPUTS.map((input, idx) => (
              <motion.div variants={itemVariants} key={input.name} custom={idx}>
                <RenderClinicsFormFields
                  input={input}
                  form={form}
                  isOptionalField={isOptionalField}
                />
              </motion.div>
            ))}

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
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
