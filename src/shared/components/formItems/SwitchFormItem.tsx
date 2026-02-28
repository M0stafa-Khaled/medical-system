import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "@/shared/components/ui/form";
import { Switch } from "@/shared/components/ui/switch";
import { IFormInput } from "@/shared/types";

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
      <div className="border-muted bg-input/30 flex flex-row items-center justify-between rounded-lg border p-3">
        <FormLabel className="cursor-pointer" htmlFor={input.name}>
          {input.label === "حالة المصروف"
            ? field.value
              ? "معتمد"
              : "ملغي"
            : field.value
              ? " نشط "
              : " غير نشط "}
        </FormLabel>
        <FormControl>
          <Switch
            id={input.name}
            checked={field.value as boolean | undefined}
            onCheckedChange={field.onChange}
            className="data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-black/50 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-white/50"
          />
        </FormControl>
      </div>
    </FormItem>
  );
};

export default SwitchFormItem;
