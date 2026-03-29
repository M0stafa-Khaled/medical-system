import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { transferTreasurySchema } from "../schema";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  useGetSimpleTreasuries,
  useTransferTreasuries,
} from "../queriesAndMutations";
import { RenderTreasuryFormFields } from "./RenderTreasuryFormFields";
import { handleResErr } from "@/shared/utils/handleResError";
import { TRANSFER_TREASURIES_FORM_INPUTS } from "../constants";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";
import { useAppSelector } from "@/app/store";
import { IEmployee } from "../../employees/types";

export const TransferBetweenTreasuries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: treasuries } = useGetSimpleTreasuries();
  const { mutateAsync: transferTreasury, isPending } = useTransferTreasuries();

  const user = useAppSelector((state) => state.auth.user) as IEmployee;

  const role = user?.user?.role;
  const isEmployee = role === "employee";
  const employeeTreasuryId = user?.treasury?.id?.toString() || "";
  const treasuriesOptions =
    treasuries?.data
      .map((treasury) => ({
        value: treasury?.id.toString(),
        label: treasury?.name,
      }))
      .filter((t) => t.value !== employeeTreasuryId) || [];

  const employeeTreasuryOption =
    user?.treasury && employeeTreasuryId
      ? [
          {
            value: employeeTreasuryId,
            label: user.treasury.name,
          },
        ]
      : [];

  const fromTreasuriesOptions = isEmployee
    ? employeeTreasuryOption
    : treasuriesOptions;

  const form = useForm<z.infer<typeof transferTreasurySchema>>({
    resolver: zodResolver(transferTreasurySchema),
    defaultValues: {
      amount: 0,
      from_treasury: isEmployee ? employeeTreasuryId : "",
      to_treasury: "",
    },
  });

  useEffect(() => {
    if (isEmployee && employeeTreasuryId) {
      form.setValue("from_treasury", employeeTreasuryId);
    }
  }, [isEmployee, employeeTreasuryId, form]);

  const onSubmit = async ({
    from_treasury,
    to_treasury,
    amount,
  }: z.infer<typeof transferTreasurySchema>) => {
    try {
      const { status, message } = await transferTreasury({
        from_treasury,
        to_treasury,
        amount: amount,
      });

      // ! Transfer failed
      if (!status) return toast.error(message);

      // * Transfer Success
      return toast.success(message);
    } catch (error) {
      handleResErr(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      amount: 0,
      from_treasury: isEmployee ? employeeTreasuryId : "",
      to_treasury: "",
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-auto gap-2 py-3 md:w-28"
      >
        تحويل
        <FaMoneyBillTransfer size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تحويل أموال"
        description={{ text: "تحويل الأموال إلي خزنة آخرى" }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {TRANSFER_TREASURIES_FORM_INPUTS.map((input, idx) => {
              const currentInput =
                isEmployee && input.name === "from_treasury"
                  ? { ...input, disabled: true }
                  : input;

              return (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                >
                  <RenderTreasuryFormFields
                    input={currentInput}
                    form={form}
                    schema={transferTreasurySchema}
                    options={{
                      fromTreasuries: fromTreasuriesOptions,
                      toTreasuries: treasuriesOptions,
                    }}
                  />
                </motion.div>
              );
            })}

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button onClick={handleCloseModal} variant={"outline"}>
                  إلغاء
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                تحويل
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};
