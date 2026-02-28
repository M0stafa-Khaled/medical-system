import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import SelectFormItem from "../../../shared/components/formItems/SelectFormItem";
import BookingAvailableTimeSelectItem from "../../../shared/components/formItems/BookingAvailableTimeSelectItem";
import BookingDateItem from "../../../shared/components/formItems/BookingDateItem";
import InputFormItem from "../../../shared/components/formItems/InputFormItem";

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
  availableTimes: string[];
  allowedDay: string;
}

const RenderPatientBookingFormFields = ({
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
            field={field}
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

export default RenderPatientBookingFormFields;
