import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SwitchFormItem from "@/shared/components/formItems/SwitchFormItem";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import InputFormItem from "@/shared/components/formItems/InputFormItem";
import DateFormItem from "@/shared/components/formItems/DateFormItem";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  schema: z.ZodSchema;
  categories?: IOption[];
}

export const RenderExpensesFormFields = ({
  input,
  form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  categories,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    switch (true) {
      case input.name == "date":
        return <DateFormItem input={input} field={field} />;

      case input.name === "status":
        return <SwitchFormItem input={input} field={field} />;

      case input.name === "category_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={categories || []}
          />
        );

      default:
        return <InputFormItem input={input} field={field} />;
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

export default RenderExpensesFormFields;
