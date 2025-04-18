import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import InputFormItem from "../../formItems/InputFormItem";
import DateFormItem from "../../formItems/DateFormItem";
import SelectFormItem from "../../formItems/SelectFormItem";
import PatientSelectItem from "../../formItems/PatientSelectItem";

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

const RenderPrescriptionFormFields = ({
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
      case input.type === "prescription_date":
        return <DateFormItem {...commonProps} />;

      case input.name === "patient_id":
        return <PatientSelectItem field={field} input={input} />;
      case input.name === "clinic_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.clinics || []}
          />
        );
      case input.name === "doctor_id":
        return (
          <SelectFormItem
            field={field}
            input={input}
            options={options?.doctors || []}
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

export default RenderPrescriptionFormFields;
