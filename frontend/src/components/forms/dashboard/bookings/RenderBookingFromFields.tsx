import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import InputFormItem from "../formItems/InputFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SelectFormItem from "../formItems/SelectFormItem";
import PatientSelectItem from "../formItems/PatientSelectItem";
import BookingDateItem from "./BookingDateItem";
import BookingAvailableTimeSelectItem from "./BookingAvailableTimeSelectItem";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  input: IFormInput;
  form: UseFormReturn;
  isOptionalField?: (fieldName: string) => boolean;
  schema: z.ZodSchema;
  options?: {
    [key: string]: IOption[];
  };
  availableTimes: string[];
  allowedDay: string;
}

const RenderBookingFormFields = ({
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
            input={input}
            field={field}
            options={options?.doctorsOptions || []}
          />
        );
      case input.name === "patient_id": {
        return <PatientSelectItem form={form} input={input} />;
      }
      case input.name === "working_day_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.workingDaysOptions || []}
          />
        );
      case input.name === "clinic_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.clinicsOptions || []}
          />
        );
      case input.name === "doctor_action_id":
        return (
          <SelectFormItem
            input={input}
            field={field}
            options={options?.doctorActionsOptions || []}
          />
        );
      case input.name === "start_at":
        return (
          <BookingAvailableTimeSelectItem
            input={input}
            form={form}
            times={availableTimes}
          />
        );
      case input.name === "date":
        return (
          <BookingDateItem
            input={input}
            field={field}
            form={form}
            allowedDay={allowedDay}
          />
        );
      case input.name === "status":
        return (
          <SelectFormItem
            field={field}
            input={input}
            options={options?.status || []}
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

export default RenderBookingFormFields;
