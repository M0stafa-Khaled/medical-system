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
import { patientUpdateProfileSchema } from "@/validations/dashboard/profileSchema";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { UPDATE_PROFILE_PATIENT_INPUTS } from "@/constants";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import RenderPatientFormFields from "../../../components/forms/dashboard/patients/RenderPatientFormFields";
import handleResErr from "@/utils/handleResponseError";
import { useUpdateProfile } from "../queriesAndMutations";

export const UpdatePatientProfile = () => {
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
      handleResErr(error);
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
      <Button className="px-4 font-medium!" onClick={() => setIsOpen(true)}>
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

            <AlertDialogFooter className="justify-start! gap-2 text-start">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="h-auto py-2.5 text-black dark:text-white"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                تحديث
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
