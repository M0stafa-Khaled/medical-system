import { IFormInput } from "@/interfaces";
import { ChangeEvent } from "react";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Select, { StylesConfig } from "react-select";
import { GENDER } from "@/constants";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

interface IProps {
  input: IFormInput;
  form: any;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
  isOptionalField: (fieldName: string) => boolean;
  doctorSchema: z.ZodSchema;
  clinicsOptions: {
    value: string;
    label: string;
  }[];
}
const DoctorFormField = ({
  form,
  handleFileChange,
  input,
  isOptionalField,
  clinicsOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doctorSchema,
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
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: theme === "dark" ? "#110f14" : "",
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
      name={input.name as keyof z.infer<typeof doctorSchema> as string}
      render={
        input.type === "switch"
          ? ({ field }) => (
              <FormItem>
                <FormLabel className="w-full">{input.label}</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border border-muted p-3.5">
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
          : input.name === "clinics"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    isMulti
                    options={clinicsOptions}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    styles={selectStyles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : input.name === "gender"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Select
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
                      className="h-auto py-3 border-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
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
                    className="py-3 border-muted placeholder:h-14 h-auto text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
      }
    />
  );
};

export default DoctorFormField;
