import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import SwitchFormItem from "./formItems/SwitchFormItem";
import GenderFormItem from "./formItems/GenderFormItem";
import FileFormItem from "./formItems/FileFormItem";
import InputFormItem from "./formItems/InputFormItem";
import MultiSelectFormItem from "./formItems/MultiSelectFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ROLES } from "@/constants";
import SelectFormItem from "./formItems/SelectFormItem";

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
          <MultiSelectFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            options={ROLES}
          />
        );
      case input.name === "category_id":
        return (
          <MultiSelectFormItem
            {...commonProps}
            isOptionalField={isOptionalField!}
            options={options?.categories || []}
          />
        );

      case input.name === "treasury_id" ||
        input.name === "from_treasury" ||
        input.name === "to_treasury":
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={options?.treasuries || []}
          />
        );
      case input.name === "permissions":
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={options?.permissions || []}
            isMulti
          />
        );

      // Bookings
      case input.type === "doctor_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            form={form}
            options={options?.doctorsOptions || []}
          />
        );
      case input.type === "patient_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            form={form}
            options={options?.patients || []}
          />
        );
      case input.type === "working_day_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            form={form}
            options={options?.workingDaysOptions || []}
          />
        );
      case input.type === "clinic_name":
        return (
          <SelectFormItem
            input={input}
            form={form}
            field={field}
            options={options?.clinicsOptions || []}
          />
        );

      case input.name === "clinics" ||
        input.name === "clinic_name" ||
        input.name === "day": {
        let setOptions;
        if (input.name === "clinics") setOptions = options?.clinics;
        else if (input.name === "clinic_name")
          setOptions = options?.clinic_name;
        else if (input.name === "day") setOptions = options?.days;
        return (
          <MultiSelectFormItem
            {...commonProps}
            options={setOptions || []}
            isMulti={input.name === "clinics"}
          />
        );
      }
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
