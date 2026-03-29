import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Form } from "@/shared/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { ArrowLeftRight, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { transferTreasurySchema } from "../schema";
import {
  useGetSimpleTreasuries,
  useTransferTreasuries,
} from "../queriesAndMutations";
import { RenderTreasuryFormFields } from "../components/RenderTreasuryFormFields";
import { handleResErr } from "@/shared/utils/handleResError";
import { TRANSFER_TREASURIES_FORM_INPUTS } from "../constants";
import { useAppSelector } from "@/app/store";
import { IEmployee } from "../../employees/types";

const TransferBetweenTreasuries = () => {
  const { data: treasuries } = useGetSimpleTreasuries();
  const { mutateAsync: transferTreasury, isPending } = useTransferTreasuries();

  const user = useAppSelector((state) => state.auth.user) as IEmployee;

  const role = user?.user?.role;
  const isEmployee = role === "employee";
  const employeeTreasuryId = user?.treasury?.id?.toString() || "";

  const treasuriesOptions =
    treasuries?.data.map((treasury) => ({
      value: treasury?.id.toString(),
      label: treasury?.name,
    })) || [];

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

  const fromTreasury = useWatch({
    control: form.control,
    name: "from_treasury",
  });
  const toTreasury = useWatch({
    control: form.control,
    name: "to_treasury",
  });
  const amount = useWatch({
    control: form.control,
    name: "amount",
  });

  const fromTreasuryLabel = fromTreasuriesOptions.find(
    (option) => option.value === fromTreasury
  )?.label;

  const toTreasuryLabel = treasuriesOptions.find(
    (option) => option.value === toTreasury
  )?.label;

  const onSubmit = async ({
    from_treasury,
    to_treasury,
    amount,
  }: z.infer<typeof transferTreasurySchema>) => {
    try {
      const { status, message } = await transferTreasury({
        from_treasury,
        to_treasury,
        amount,
      });

      if (!status) {
        toast.error(message);
        return;
      }

      toast.success(message);
      form.reset({
        amount: 0,
        from_treasury: isEmployee ? employeeTreasuryId : "",
        to_treasury: "",
      });
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تحويل بين الخزائن</title>
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative space-y-6"
      >
        <div className="from-primary/15 via-primary/5 to-background relative overflow-hidden rounded-2xl border bg-linear-to-bl p-5 md:p-7">
          <div className="bg-primary/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl" />
          <div className="bg-primary/5 absolute -bottom-10 -left-6 h-28 w-28 rounded-full blur-xl" />

          <div className="relative space-y-3">
            <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              عملية مالية داخلية
            </span>

            <div>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                تحويل بين الخزائن
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                حوّل الأموال بسرعة بين الخزائن مع مراجعة فورية لبيانات التحويل
                قبل التنفيذ.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="bg-card/90 rounded-2xl border p-4 shadow-sm backdrop-blur md:p-6 lg:col-span-2">
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
                          toTreasuries: treasuriesOptions.filter(
                            (t) => t.value !== employeeTreasuryId
                          ),
                        }}
                      />
                    </motion.div>
                  );
                })}

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-11 w-full md:w-auto"
                  >
                    تنفيذ التحويل
                    {isPending && <Loader2 className="ml-2 animate-spin" />}
                  </Button>
                </div>
              </motion.form>
            </Form>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border bg-linear-to-b from-emerald-50 to-transparent p-4 md:p-5 dark:from-emerald-950/20">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                ملخص التحويل
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-background/70 rounded-lg border p-3">
                  <p className="text-muted-foreground text-xs">من خزنة</p>
                  <p className="mt-1 font-medium">
                    {fromTreasuryLabel || "لم يتم التحديد"}
                  </p>
                </div>

                <div className="bg-background/70 rounded-lg border p-3">
                  <p className="text-muted-foreground text-xs">إلى خزنة</p>
                  <p className="mt-1 font-medium">
                    {toTreasuryLabel || "لم يتم التحديد"}
                  </p>
                </div>

                <div className="bg-background/70 rounded-lg border p-3">
                  <p className="text-muted-foreground text-xs">المبلغ</p>
                  <p className="mt-1 text-lg font-extrabold">
                    {Number(amount || 0).toLocaleString("ar-EG")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border p-4 md:p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Wallet className="text-primary h-4 w-4" />
                تنبيه
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                تأكد من اختيار الخزنة الصحيحة قبل تنفيذ العملية، ولا يمكن
                التراجع عن التحويل بعد التأكيد.
              </p>
            </div>
          </motion.aside>
        </div>
      </motion.section>
    </>
  );
};

export default TransferBetweenTreasuries;
