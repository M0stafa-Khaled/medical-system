import { FormField } from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ChangeEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GENDER } from "@/constants";
import SwitchFormItem from "../../formItems/SwitchFormItem";
import SelectFormItem from "../../formItems/SelectFormItem";
import FileFormItem from "../../formItems/FileFormItem";
import InputFormItem from "../../formItems/InputFormItem";

interface IProps {
  input: IFormInput;
  form: UseFormReturn;
  handleFileChange?: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField?: (fieldName: string) => boolean;
  schema: z.ZodSchema;
}

const RenderPatientFormFields = ({
  input,
  form,
  handleFileChange,
  isOptionalField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
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

export default RenderPatientFormFields;
