import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ChangeEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SwitchFormItem from "@/shared/components/formItems/SwitchFormItem";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import FileFormItem from "@/shared/components/formItems/FileFormItem";
import MultiSelectFormItem from "@/shared/components/formItems/MultiSelectFormItem";
import InputFormItem from "@/shared/components/formItems/InputFormItem";

import { GENDER } from "@/shared/constants";

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

export const RenderDoctorFormFields = ({
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
