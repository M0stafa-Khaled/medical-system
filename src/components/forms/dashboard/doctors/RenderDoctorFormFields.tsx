import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SwitchFormItem from "../../formItems/SwitchFormItem";
import SelectFormItem from "../../formItems/SelectFormItem";
import FileFormItem from "../../formItems/FileFormItem";
import MultiSelectFormItem from "../../formItems/MultiSelectFormItem";
import InputFormItem from "../../formItems/InputFormItem";

import { GENDER } from "@/constants";

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

const RenderDoctorFormFields = ({
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

      case input.name === "clinics": {
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={options?.clinics || []}
          />
        );
      }

      // Working Day
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

export default RenderDoctorFormFields;
