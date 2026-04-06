import { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { handleResErr } from "@/shared/utils/handleResError";
import { useCreateDoctorAction } from "../../queriesAndMutations";
import { RenderDoctorFormFields } from "../RenderDoctorFormFields";
import { doctorActionSchema } from "../../working-days/schema";
import { DOCTOR_ACTION_INPUTS } from "../../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const CreateAction = ({ doctorId }: { doctorId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createDoctorAction, isPending } =
    useCreateDoctorAction();
  const form = useForm<z.infer<typeof doctorActionSchema>>({
    resolver: zodResolver(doctorActionSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async ({
    name,
    price,
  }: z.infer<typeof doctorActionSchema>) => {
    try {
      const { message, status } = await createDoctorAction({
        formData: { name, price: `${price}`, doctor_id: doctorId },
      });
      // ! Create failed
      if (!status) return toast.error(message);
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

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"lg"}
        className="dark:btn-primary"
      >
        إضافة إجراء
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة إجراء"
        description={{
          text: "يمكنك اضافة إجراء جديد من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {DOCTOR_ACTION_INPUTS.map((input, idx) => (
              <motion.div variants={itemVariants} key={input.name} custom={idx}>
                <RenderDoctorFormFields
                  input={input}
                  form={form}
                  schema={doctorActionSchema}
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
