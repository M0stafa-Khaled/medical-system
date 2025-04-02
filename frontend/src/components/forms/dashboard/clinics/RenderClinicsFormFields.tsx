import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import SwitchFormItem from "../formItems/SwitchFormItem";
import InputFormItem from "../formItems/InputFormItem";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import clinicSchema from "@/validations/clinicSchema";

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  isOptionalField?: (fieldName: string) => boolean;
}

const RenderClinicsFormFields = ({ input, form }: IProps) => {
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

export default RenderClinicsFormFields;
