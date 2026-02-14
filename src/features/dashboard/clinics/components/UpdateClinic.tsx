import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { clinicSchema } from "../schema";
import { useUpdateClinic } from "../queriesAndMutations";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { CLINIC_FORM_INPUTS } from "@/constants";
import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { handleResErr } from "@/shared/utils/handleResError";
import { RenderClinicsFormFields } from "./RenderClinicsFormFields";

interface IProps {
  id: number;
  name: string;
  status: boolean;
  virtual_number: number;
}
export const UpdateClinic = ({ id, name, status, virtual_number }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: updateClinic, isPending } = useUpdateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: name,
      status: status,
      virtual_number: virtual_number,
    },
  });
  const onSubmit = async ({
    name,
    status,
    virtual_number,
  }: z.infer<typeof clinicSchema>) => {
    try {
      const { status: statusServer, message } = await updateClinic({
        id,
        name,
        status,
        virtual_number,
      });

      // ! Update failed
      if (!statusServer) return toast.error(message);
      // * Update Success
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

  useEffect(() => {
    form.reset({
      name: name,
      status: status,
      virtual_number: virtual_number,
    });
  }, [name, status, form, virtual_number]);

  return (
    <>
      <TooltipButton title="تعديل">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          size={"icon"}
          variant={"outline"}
          className="btn-edit rounded-full"
        >
          <Pen size={20} />
        </Button>
      </TooltipButton>

      {/* Update Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل عيادة"
        description={{
          text: "يمكنك تعديل العيادة المحددة من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-black dark:text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
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
            <AlertDialogFooter className="justify-start! gap-2 text-start">
              <AlertDialogCancel className="h-auto py-2.5 text-black dark:text-white">
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تعديل
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
