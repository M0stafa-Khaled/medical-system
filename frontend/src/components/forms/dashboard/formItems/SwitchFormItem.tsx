import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../../ui/form";
import { Switch } from "../../../ui/switch";
import { IFormInput } from "@/interfaces";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
}

const SwitchFormItem = ({ input, field }: IProps) => {
  return (
    <FormItem>
      <FormLabel className="w-full" htmlFor={input.name}>
        {input.label}
      </FormLabel>
      <div className="flex flex-row items-center justify-between rounded-lg border border-muted p-3">
        <FormLabel className="cursor-pointer" htmlFor={input.name}>
          {input.label === "حالة المصروف"
            ? field.value
              ? "معتمد"
              : "ملغي"
            : field.value
            ? " مفعل "
            : " غير مفعل "}
        </FormLabel>
        <FormControl>
          <Switch
            id={input.name}
            dir="ltr"
            checked={field.value as boolean | undefined}
            onCheckedChange={field.onChange}
            className="data-[state=unchecked]:bg-black/50 data-[state=checked]:bg-green-700 dark:data-[state=unchecked]:bg-white/50 dark:data-[state=checked]:bg-green-500"
          />
        </FormControl>
      </div>
    </FormItem>
  );
};

export default SwitchFormItem;
