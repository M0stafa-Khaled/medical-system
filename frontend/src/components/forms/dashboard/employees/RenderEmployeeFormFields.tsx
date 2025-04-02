import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GENDER, ROLES } from "@/constants";
import SwitchFormItem from "../formItems/SwitchFormItem";
import FileFormItem from "../formItems/FileFormItem";
import MultiSelectFormItem from "../formItems/MultiSelectFormItem";
import InputFormItem from "../formItems/InputFormItem";
import SelectFormItem from "../formItems/SelectFormItem";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  handleFileChange?: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField?: (fieldName: string) => boolean;
  schema: z.ZodSchema;
  options?: {
    [key: string]: IOption[];
  };
}

const RenderEmployeeFormFields = ({
  input,
  form,
  handleFileChange,
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
      case input.name === "status":
        return <SwitchFormItem {...commonProps} />;

      case input.name === "gender":
        return <SelectFormItem options={GENDER} {...commonProps} />;

      case input.type === "file":
        return (
          <FileFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            handleFileChange={handleFileChange!}
          />
        );
      case input.name === "role":
        return <SelectFormItem {...commonProps} options={ROLES} />;

      case input.name === "treasury_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.treasuries || []}
            isOptionalField={isOptionalField!}
          />
        );
      case input.name === "permissions":
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={options?.permissions || []}
          />
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

export default RenderEmployeeFormFields;
