import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";

interface PermissionsFieldProps {
  control: any;
  isOptionalField: (fieldName: string) => boolean;
  permissionsOptions: any[];
}

export const PermissionsField = ({
  control,
  isOptionalField,
  permissionsOptions,
}: PermissionsFieldProps) => {
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
      control={control}
      name="permissions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            الصلاحيات
            {isOptionalField("permissions") && (
              <span className="text-xs text-muted-foreground"> (اختياري)</span>
            )}
          </FormLabel>
          <FormControl>
            <Select
              {...field}
              isMulti
              options={permissionsOptions}
              onChange={(selectedOptions) => {
                field.onChange(selectedOptions);
              }}
              styles={selectStyles}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
