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
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { CLINIC_FORM_INPUTS } from "@/constants";
import RenderFormFields from "@/components/forms/RenderFormFields";

const AddClinicModalButton = () => {
  const token = cookieServices.getToken()!;
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { mutateAsync: createClinic, isPending } = useCreateClinic();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      status: true,
    },
  });

  const onSubmit = async ({ name, status }: z.infer<typeof clinicSchema>) => {
    try {
      const {
        status: statusServer,
        message,
        data,
      } = await createClinic({
        name,
        status,
        token,
      });

      // ! Create failed
      if (!statusServer) return toast.error(message);

      // * Create Success
      return toast.success(`${message} '${data.name}'`);
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
      if (errorObj?.response?.data.message) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
    } finally {
      setIsOpenAddModal(false);
      form.reset();
    }
  };

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    form.reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpenAddModal(true)}
        size={"sm"}
        variant={"outline"}
        className="bg-primary md:bg-transparent md:text-primary text-primary-foreground gap-2 hover:!bg-primary hover:!text-white !border-primary dark:hover:!text-black py-[1.4rem] !rounded-lg font-semibold"
      >
        إضافة عيادة جديدة
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpenAddModal}
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
            className="space-y-5 text-black dark:text-white"
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

export default AddClinicModalButton;
