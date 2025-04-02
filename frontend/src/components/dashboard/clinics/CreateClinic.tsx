import { useState } from "react";
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
import clinicSchema from "@/validations/clinicSchema";
import { useCreateClinic } from "@/lib/react-query/dashboard/clinics";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { CLINIC_FORM_INPUTS } from "@/constants";
import handleResErr from "@/utils/handleResponseError";
import RenderClinicsFormFields from "@/components/forms/dashboard/clinics/RenderClinicsFormFields";

const CreateClinic = () => {
  const token = cookieServices.getToken()!;
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
      const {
        status: statusServer,
        message,
        data,
      } = await createClinic({
        name,
        status,
        token,
        virtual_number,
      });

      // ! Create failed
      if (!statusServer) return toast.error(message);

      // * Create Success
      return toast.success(`${message} '${data.name}'`);
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
        className="flex items-center gap-2 h-auto py-3"
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
            className="space-y-2 text-black dark:text-white"
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

export default CreateClinic;
