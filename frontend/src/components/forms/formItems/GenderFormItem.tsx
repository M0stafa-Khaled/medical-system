import { IFormInput } from "@/interfaces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useTheme } from "next-themes";
import { StylesConfig } from "react-select";
import { GENDER } from "@/constants";
import Select from "react-select";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
}
const GenderFormItem = ({ input, field }: IProps) => {
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
          options={GENDER}
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

export default GenderFormItem;
