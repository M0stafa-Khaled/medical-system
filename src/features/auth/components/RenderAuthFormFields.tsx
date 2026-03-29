import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { GENDER } from "@/shared/constants";
import { Input } from "@/shared/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";

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
  const [showPassword, setShowPassword] = useState(false);
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
            <FormLabel
              htmlFor={input.name}
              className="text-foreground font-medium dark:text-white"
            >
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
                  className="file:bg-primary file:hover:bg-primary/90 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary dark:focus:ring-primary/50 h-auto cursor-pointer transition-colors file:cursor-pointer file:rounded-full file:border-0 file:px-4 file:text-sm file:font-semibold file:text-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );

      case input.type === "password":
        return (
          <FormItem>
            <FormLabel
              className="text-foreground font-medium dark:text-white"
              htmlFor={input.name}
            >
              {input.label}
            </FormLabel>
            <FormControl>
              <div className="group relative">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground absolute top-2/4 left-3 grid h-5 w-5 -translate-y-2/4 place-items-center transition-colors dark:text-gray-400 dark:hover:text-white"
                  name={showPassword ? "اخفاء كلمة المرور" : "عرض كلمة المرور"}
                >
                  {showPassword ? (
                    <Eye
                      size={20}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </button>
                <Input
                  id={input.name}
                  placeholder={input.placeholder}
                  type={showPassword ? "text" : input.type}
                  {...field}
                  className="border-border text-foreground placeholder:text-muted-foreground focus:ring-primary dark:focus:ring-primary/50 h-auto py-3 pr-2 pl-9 transition-colors md:py-3.5 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );

      default:
        return (
          <FormItem>
            <FormLabel
              className="text-foreground font-medium dark:text-white"
              htmlFor={input.name}
            >
              {input.label}
            </FormLabel>
            <FormControl>
              <Input
                id={input.name}
                placeholder={input.placeholder}
                type={input.type}
                {...field}
                className="border-border text-foreground placeholder:text-muted-foreground focus:ring-primary dark:focus:ring-primary/50 h-auto py-3 transition-colors dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500"
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
