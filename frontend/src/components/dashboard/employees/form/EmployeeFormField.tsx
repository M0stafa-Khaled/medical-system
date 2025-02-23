import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Select from "react-select";
import { GENDER, ROLES } from "@/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { StylesConfig } from "react-select";
import { useTheme } from "next-themes";
import { z } from "zod";
import { ChangeEvent } from "react";

interface IProps {
  input: IFormInput;
  form: any;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField: (fieldName: string) => boolean;
  employeeSchema: z.ZodSchema;
}

const EmployeeFormField = ({
  input,
  form,
  handleFileChange,
  isOptionalField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  employeeSchema,
}: IProps) => {
  const { theme } = useTheme();
  const selectStyles: StylesConfig = {
    input: (baseStyles) => ({
      ...baseStyles,
      color: "#1e1c21",
      padding: "8px 0px",
    }),
    menu: (baseState) => ({
      ...baseState,
      color: theme === "dark" ? "#fafafa" : "",
    }),
    option: (baseStyle) => ({
      ...baseStyle,
      color: theme === "dark" ? "#110f14" : "",
      paddingTop: "12px",
      paddingBottom: "12px",
    }),
  };

  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof employeeSchema> as string}
      render={
        input.type === "switch"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <div className="border-muted flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel>{field.value ? " مفعل " : " غير مفعل "}</FormLabel>
                  <FormControl>
                    <Switch
                      dir="ltr"
                      checked={field.value as boolean | undefined}
                      onCheckedChange={field.onChange}
                      className="data-[state=unchecked]:bg-black/50 data-[state=checked]:bg-green-700 dark:data-[state=unchecked]:bg-white/50 dark:data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )
          : input.name === "gender"
          ? ({ field }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    id={input.name}
                    {...field}
                    options={GENDER}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    styles={selectStyles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : input.name === "role"
          ? ({ field }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    id={input.name}
                    {...field}
                    options={ROLES}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    styles={selectStyles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : input.type === "file"
          ? ({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>
                  {input.label}
                  {isOptionalField(input.name) && (
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      (اختياري)
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <Input
                      id={input.name}
                      type="file"
                      accept={input.accept}
                      onChange={(e) => handleFileChange(e, onChange)}
                      className="border-muted h-auto py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      {...field}
                      value={undefined}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : ({ field }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>
                  {input.label}
                  {isOptionalField(input.name) && (
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      (اختياري)
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value as string | undefined}
                    className="border-muted py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
      }
    />
  );
};

export default EmployeeFormField;
