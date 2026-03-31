import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SwitchFormItem from "@/shared/components/formItems/SwitchFormItem";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import MultiSelectFormItem from "@/shared/components/formItems/MultiSelectFormItem";
import { PatientBalancesSelect } from "./PatientBalancesSelect";
import { PatientSelectItem } from "@/shared/components/formItems/PatientSelectItem";
import InputFormItem from "@/shared/components/formItems/InputFormItem";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  isOptionalField?: (fieldName: string) => boolean;
  schema: z.ZodSchema;
  options?: {
    [key: string]: IOption[];
  };
  patientId?: string;
}

export const RenderTransactionFormFields = ({
  input,
  form,
  isOptionalField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  options,
  patientId,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    const commonProps = {
      field,
      input,
      isOptionalField,
    };

    switch (true) {
      case input.name === "status":
        return <SwitchFormItem {...commonProps} />;

      case input.name === "payment_method":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.paymentMethods || []}
          />
        );
      case input.name === "doctor_actions":
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={options?.doctorActions || []}
          />
        );

      case input.name === "transaction_code":
        return (
          <PatientBalancesSelect
            input={input}
            patientId={patientId!}
            field={field}
            form={form}
          />
        );

      case input.name === "patient_id":
        return <PatientSelectItem field={field} input={input} />;

      default:
        return <InputFormItem {...commonProps} />;
    }
  };

  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof schema> as string}
      render={renderField}
    />
  );
};
