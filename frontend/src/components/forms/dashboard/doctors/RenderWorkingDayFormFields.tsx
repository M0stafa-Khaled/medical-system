import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import InputFormItem from "../formItems/InputFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SelectFormItem from "../formItems/SelectFormItem";

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
}

const DayRenderFormFields = ({
  input,
  form,
  isOptionalField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  options,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    const commonProps = {
      field,
      input,
      isOptionalField,
    };

    switch (true) {
      case input.name === "clinic_id":
        return (
          <SelectFormItem {...commonProps} options={options?.clinics || []} />
        );

      case input.name === "day":
        return (
          <SelectFormItem {...commonProps} options={options?.days || []} />
        );
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

export default DayRenderFormFields;
