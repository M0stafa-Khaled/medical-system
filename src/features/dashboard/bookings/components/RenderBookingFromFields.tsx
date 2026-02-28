import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z, type ZodSchema } from "zod/v3";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import { PatientSelectItem } from "@/shared/components/formItems/PatientSelectItem";
import BookingAvailableTimeSelectItem from "@/shared/components/formItems/BookingAvailableTimeSelectItem";
import BookingDateItem from "@/shared/components/formItems/BookingDateItem";
import InputFormItem from "@/shared/components/formItems/InputFormItem";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  isOptionalField?: (fieldName: string) => boolean;
  schema: ZodSchema;
  options?: {
    [key: string]: IOption[];
  };
  availableTimes: string[];
  allowedDay: string;
}

export const RenderBookingFormFields = ({
  input,
  form,
  isOptionalField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  options,
  availableTimes,
  allowedDay,
}: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    const commonProps = {
      field,
      input,
      isOptionalField,
    };

    switch (true) {
      case input.name === "doctor_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.doctorsOptions || []}
          />
        );
      case input.name === "patient_id": {
        return <PatientSelectItem field={field} input={input} />;
      }
      case input.name === "working_day_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.workingDaysOptions || []}
          />
        );
      case input.name === "clinic_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.clinicsOptions || []}
          />
        );
      case input.name === "doctor_action_id":
        return (
          <SelectFormItem
            {...commonProps}
            options={options?.doctorActionsOptions || []}
          />
        );
      case input.name === "start_at":
        return (
          <BookingAvailableTimeSelectItem
            {...commonProps}
            times={availableTimes}
          />
        );
      case input.name === "date":
        return (
          <BookingDateItem
            {...commonProps}
            form={form}
            allowedDay={allowedDay}
          />
        );
      case input.name === "status":
        return (
          <SelectFormItem {...commonProps} options={options?.status || []} />
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
