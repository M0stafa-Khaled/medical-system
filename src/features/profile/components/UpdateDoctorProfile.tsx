import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, LucideUserCog } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { useUploadImgHandler } from "@/shared/hooks/useUploadImgHandler";
import { handleResErr } from "@/shared/utils/handleResError";
import { useUpdateProfile } from "../queriesAndMutations";
import { doctorUpdateProfileSchema } from "../schema";
import { RenderDoctorFormFields } from "@/features/dashboard/doctors/components/RenderDoctorFormFields";
import { UPDATE_PROFILE_DOCTOR_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

interface UpdateDoctorProfileProps {
  className?: string;
}

export const UpdateDoctorProfile = ({
  className = "",
}: UpdateDoctorProfileProps) => {
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
      <Button
        className={`w-full gap-2 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <LucideUserCog className="h-4 w-4" />
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
            className="space-y-3"
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

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                تحديث
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
