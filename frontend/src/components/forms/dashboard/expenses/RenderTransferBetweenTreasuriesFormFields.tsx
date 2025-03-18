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
  schema: z.ZodSchema;
  options?: {
    [key: string]: IOption[];
  };
}

const RenderTransferBetweenTreasuriesFormFields = ({
  input,
  form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  options,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    const commonProps = {
      field,
      input,
    };

    if (input.name !== "amount")
      return (
        <SelectFormItem {...commonProps} options={options?.treasuries || []} />
      );
    else return <InputFormItem {...commonProps} />;
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

export default RenderTransferBetweenTreasuriesFormFields;
