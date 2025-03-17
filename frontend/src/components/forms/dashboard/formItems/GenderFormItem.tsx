import { IFormInput } from "@/interfaces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { GENDER } from "@/constants";
import SelectFormItem from "./SelectFormItem";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
}
const GenderFormItem = ({ input, field }: IProps) => {
  return (
    <FormItem>
      <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
      <FormControl>
        <SelectFormItem options={GENDER} field={field} input={input} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default GenderFormItem;
