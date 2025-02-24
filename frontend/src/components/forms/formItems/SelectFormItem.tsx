import { IFormInput } from "@/interfaces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
  options: { value: string; label: string }[];
  isMulti?: boolean;
}

const SelectFormItem = ({ input, field, options, isMulti = false }: IProps) => {
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
    <FormItem>
      <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
      <FormControl>
        <Select
          id={input.name}
          {...field}
          isMulti={isMulti}
          options={options}
          onChange={(selectedOptions) => {
            field.onChange(selectedOptions);
          }}
          styles={selectStyles}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SelectFormItem;
