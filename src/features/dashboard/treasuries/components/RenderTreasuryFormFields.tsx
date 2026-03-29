import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SwitchFormItem from "@/shared/components/formItems/SwitchFormItem";
import InputFormItem from "@/shared/components/formItems/InputFormItem";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";

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

export const RenderTreasuryFormFields = ({
  input,
  form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  options,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    switch (true) {
      case input.name === "from_treasury":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.fromTreasuries || options?.treasuries || []}
          />
        );

      case input.name === "to_treasury":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.toTreasuries || options?.treasuries || []}
          />
        );

      case input.name === "status":
        return <SwitchFormItem field={field} input={input} />;

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
