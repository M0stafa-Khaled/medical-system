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
import { doctorUpdateProfileSchema } from "@/validations/authSchema";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { UPDATE_PROFILE_DOCTOR_INPUTS } from "@/constants";
import { useUpdateProfile } from "@/lib/react-query/profile/profile";
import RenderDoctorFormFields from "../forms/dashboard/doctors/RenderDoctorFormFields";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import handleResErr from "@/utils/handleResponseError";

const UpdateDoctorProfile = () => {
  const token = cookieServices.getToken()!;
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<z.infer<typeof doctorUpdateProfileSchema>>({
    resolver: zodResolver(doctorUpdateProfileSchema),
    defaultValues: {
      image: undefined,
      signature: undefined,
    },
  });

  const onSubmit = async ({
    image,
    signature,
  }: z.infer<typeof doctorUpdateProfileSchema>) => {
    if (!image && !signature) return handleCloseModal();

    try {
      const { status, message } = await updateProfile({
        token,
        role: "doctor",
        dataForm: {
          image: image,
          signature: signature,
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
    const optionalFields = ["image", "signature"];
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
          text: "يمكنك تحديث الصورة الشخصية والتوقيع فقط!",
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
            {UPDATE_PROFILE_DOCTOR_INPUTS.map((input) => (
              <motion.div
                variants={itemVariants}
                key={input.name}
                custom={input.name}
              >
                <RenderDoctorFormFields
                  handleFileChange={handleFileChange}
                  isOptionalField={isOptionalField}
                  input={input}
                  schema={doctorUpdateProfileSchema}
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

export default UpdateDoctorProfile;
