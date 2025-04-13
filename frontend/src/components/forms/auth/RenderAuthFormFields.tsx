import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { z } from "zod";
import { ChangeEvent } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GENDER } from "@/constants";
import SelectFormItem from "../formItems/SelectFormItem";
import PasswordFormItem from "../formItems/PasswordFormItem";
import { Input } from "@/components/ui/input";

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField: (fieldName: string) => boolean;
  schema: z.ZodSchema;
}

const RenderAuthFormFields = ({
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
      case input.name === "gender":
        return <SelectFormItem options={GENDER} {...commonProps} />;

      case input.type === "file":
        return (
          <FormItem>
            <FormLabel htmlFor={input.name} className="text-black">
              {input.label}
            </FormLabel>
            <FormControl>
              <div className="flex flex-col gap-4">
                <Input
                  id={input.name}
                  type="file"
                  accept={input.accept}
                  {...field}
                  onChange={(e) => handleFileChange(e, field.onChange)}
                  value={undefined}
                  className="cursor-pointer border-black/20 text-black placeholder:text-black/50 focus-visible:ring-[#bababa] h-auto py-1.5 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white file:cursor-pointer"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );

      case input.type === "password":
        return <PasswordFormItem input={input} field={field} />;

      default:
        return (
          <FormItem>
            <FormLabel className="text-black" htmlFor={input.name}>
              {input.label}
              {isOptionalField(input.name!) && (
                <span className="text-xs text-muted-foreground">
                  {" "}
                  (اختياري)
                </span>
              )}
            </FormLabel>
            <FormControl>
              <Input
                id={input.name}
                placeholder={input.placeholder}
                type={input.type}
                {...field}
                className="px-2 py-3 lg:py-3.5 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
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

export default RenderAuthFormFields;
