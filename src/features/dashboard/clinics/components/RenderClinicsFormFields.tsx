import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import SwitchFormItem from "../../../../components/forms/formItems/SwitchFormItem";
import InputFormItem from "../../../../components/forms/formItems/InputFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { clinicSchema } from "../schema";

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  isOptionalField?: (fieldName: string) => boolean;
}

export const RenderClinicsFormFields = ({ input, form }: IProps) => {
  const renderField = ({ field }: { field: ControllerRenderProps }) => {
    switch (true) {
      case input.name === "status":
        return <SwitchFormItem input={input} field={field} />;

      default:
        return <InputFormItem input={input} field={field} />;
    }
  };

  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof clinicSchema> as string}
      render={renderField}
    />
  );
};
