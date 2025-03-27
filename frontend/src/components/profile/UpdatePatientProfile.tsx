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
import { patientUpdateProfileSchema } from "@/validations/authSchema";
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
import { UPDATE_PROFILE_PATIENT_INPUTS } from "@/constants";
import { useUpdateProfile } from "@/lib/react-query/profile/profile";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import RenderPatientFormFields from "../forms/dashboard/patients/RenderPatientFormFields";

const UpdatePatientProfile = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<z.infer<typeof patientUpdateProfileSchema>>({
    resolver: zodResolver(patientUpdateProfileSchema),
    defaultValues: {
      another_name: "",
      first_phone: "",
      second_phone: "",
      personal_image: undefined,
    },
  });

  const onSubmit = async ({
    first_phone,
    second_phone,
    another_name,
    personal_image,
  }: z.infer<typeof patientUpdateProfileSchema>) => {
    if (another_name && !first_phone && !second_phone && !personal_image)
      return handleCloseModal();

    try {
      const { status, message } = await updateProfile({
        token,
        role: "patient",
        dataForm: {
          first_phone,
          second_phone,
          another_name,
          personal_image,
        },
      });

      // ! Update failed
      if (!status) return toast.error(message);

      // * Update Success
      return toast.success(message);
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
      if (
        errorObj?.response?.data.message &&
        !errorObj?.response?.data.errors
      ) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
    } finally {
      handleCloseModal();
    }
  };
  const { handleFileChange } = useUploadImgHandler(form);

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const isOptionalField = (fieldName: string) => {
    const optionalFields = [
      "another_name",
      "first_phone",
      "second_phone",
      "personal_image",
    ];
    return optionalFields.includes(fieldName);
  };

  return (
    <>
      <Button className="px-4 !font-medium" onClick={() => setIsOpen(true)}>
        تحديث الملف الشخصي
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تحديث الملف الشخصي"
        description={{
          text: "يمكنك تحديث الملف الشخصي من هنا!",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-black dark:text-white"
          >
            {UPDATE_PROFILE_PATIENT_INPUTS.map((input) => (
              <motion.div
                variants={itemVariants}
                key={input.name}
                custom={input.name}
              >
                <RenderPatientFormFields
                  handleFileChange={handleFileChange}
                  isOptionalField={isOptionalField}
                  input={input}
                  schema={patientUpdateProfileSchema}
                  form={form}
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
                تحديث
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePatientProfile;
