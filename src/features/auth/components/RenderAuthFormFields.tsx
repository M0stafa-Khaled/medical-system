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
import SelectFormItem from "../../../components/forms/formItems/SelectFormItem";
import PasswordFormItem from "../../../components/forms/formItems/PasswordFormItem";
import { Input } from "@/components/ui/input";

interface IProps {
  input: IFormInput;
  form: UseFormReturn<any>;
  handleFileChange?: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField?: (fieldName: string) => boolean;
  schema: z.ZodSchema;
}

export const RenderAuthFormFields = ({
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
                  onChange={(e) =>
                    handleFileChange && handleFileChange(e, field.onChange)
                  }
                  value={undefined}
                  className="h-auto cursor-pointer border-black/20 py-1.5 text-black file:cursor-pointer file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white placeholder:text-black/50 focus-visible:ring-[#bababa]"
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
              {isOptionalField && isOptionalField(input.name!) && (
                <span className="text-muted-foreground text-xs">
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
                className="h-auto border-black/20 px-2 py-2.5 text-black placeholder:h-14 placeholder:text-sm placeholder:text-black/50 focus-visible:ring-[#bababa] md:py-3.5"
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
