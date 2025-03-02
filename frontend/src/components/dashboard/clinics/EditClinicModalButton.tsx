import { FaPencil } from "react-icons/fa6";
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
import clinicSchema from "@/validations/clinicSchema";
import { useUpdateClinic } from "@/lib/react-query/clinics";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import cookieServices from "@/utils/cookieServices";
import Modal from "@/components/shared/Modal";
import { CLINIC_FORM_INPUTS } from "@/constants";
import RenderFormFields from "@/components/forms/RenderFormFields";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { motion } from "framer-motion";

interface IProps {
  id: number;
  name: string;
  status: boolean;
}
const EditClinicModalButton = ({ id, name, status }: IProps) => {
  const token = cookieServices.getToken() || "";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync: updateClinic, isPending } = useUpdateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: name,
      status: status,
    },
  });
  const onSubmit = async ({ name, status }: z.infer<typeof clinicSchema>) => {
    try {
      const {
        status: statusServer,
        message,
        data,
      } = await updateClinic({ id, name, status, token });

      // ! Update failed
      if (!statusServer) return toast.error(message);
      // * Update Success
      return toast.success(`${message} (${data.name})`);
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  useEffect(() => {
    form.reset({
      name: name,
      status: status,
    });
  }, [name, status, form]);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
      >
        <FaPencil size={24} />
      </Button>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل عيادة"
        description={{
          text: "يمكنك تعديل العيادة المحددة هنا",
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
                <RenderFormFields
                  input={input}
                  form={form}
                  schema={clinicSchema}
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
                حفظ
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </div>
  );
};

export default EditClinicModalButton;
