import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import SwitchFormItem from "./formItems/SwitchFormItem";
import GenderFormItem from "./formItems/GenderFormItem";
import FileFormItem from "./formItems/FileFormItem";
import InputFormItem from "./formItems/InputFormItem";
import SelectFormItem from "./formItems/SelectFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ROLES } from "@/constants";

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
    categories?: IOption[];
    treasuries?: IOption[];
    permissions?: IOption[];
    clinics?: IOption[];
  };
}

const RenderFormFields = ({
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
        return <GenderFormItem {...commonProps} />;

      case input.type === "file":
        return (
          <FileFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            handleFileChange={handleFileChange!}
          />
        );
      case input.name === "role":
        return (
          <SelectFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            options={ROLES}
          />
        );
      case input.name === "category_id":
        return (
          <SelectFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            options={options?.categories || []}
          />
        );

      case input.name === "treasury_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.treasuries || []}
          />
        );
      case input.name === "permissions":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.permissions || []}
            isMulti
          />
        );
      case input.name === "clinics":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.clinics || []}
            isMulti
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

export default RenderFormFields;
