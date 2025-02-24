import { FormField } from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import SwitchFormItem from "./formItems/SwitchFormItem";
import GenderFormItem from "./formItems/GenderFormItem";
import FileFormItem from "./formItems/FileFormItem";
import InputFormItem from "./formItems/InputFormItem";
import SelectFormItem from "./formItems/SelectFormItem";
import { ROLES } from "@/constants";

interface IProps {
  input: IFormInput;
  form: any;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField: (fieldName: string) => boolean;
  schema: z.ZodSchema;
  options?: {
    value: string;
    label: string;
  }[];
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
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof schema> as string}
      render={
        input.name === "status"
          ? ({ field }) => <SwitchFormItem field={field} input={input} />
          : input.name === "gender"
          ? ({ field }) => <GenderFormItem field={field} input={input} />
          : input.type === "file"
          ? ({ field }) => (
              <FileFormItem
                input={input}
                field={field}
                isOptionalField={isOptionalField}
                handleFileChange={handleFileChange}
              />
            )
          : input.name === "role"
          ? ({ field }) => (
              <SelectFormItem input={input} field={field} options={ROLES} />
            )
          : input.name === "clinics" || input.name === "permissions"
          ? ({ field }) => (
              <SelectFormItem
                field={field}
                input={input}
                options={options || []}
                isMulti
              />
            )
          : ({ field }) => (
              <InputFormItem
                input={input}
                field={field}
                isOptionalField={isOptionalField}
              />
            )
      }
    />
  );
};

export default RenderFormFields;
