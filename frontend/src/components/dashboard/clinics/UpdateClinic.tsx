import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clinicSchema from "@/validations/dashboard/clinicSchema";
import { useUpdateClinic } from "@/lib/react-query/dashboard/clinics";
import { toast } from "react-toastify";
import { Loader2, Pen } from "lucide-react";
import cookieServices from "@/utils/cookieServices";
import Modal from "@/components/shared/Modal";
import { CLINIC_FORM_INPUTS } from "@/constants";
import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import TooltipButton from "@/components/ui/TooltipButton";
import handleResErr from "@/utils/handleResponseError";
import RenderClinicsFormFields from "@/components/forms/dashboard/clinics/RenderClinicsFormFields";
interface IProps {
  id: number;
  name: string;
  status: boolean;
  virtual_number: number;
}
const UpdateClinic = ({ id, name, status, virtual_number }: IProps) => {
  const token = cookieServices.getToken() || "";

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
        token,
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
          className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
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
            <AlertDialogFooter className="text-start !justify-start gap-2">
              <AlertDialogCancel className="text-black dark:text-white py-2.5 h-auto">
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
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

export default UpdateClinic;
