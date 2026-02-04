import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { IFormInput } from "@/interfaces";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
  isOptionalField?: (name: string) => boolean;
}

const InputFormItem = ({ input, field, isOptionalField }: IProps) => {
  return (
    <FormItem>
      <FormLabel htmlFor={input.name}>
        {input.label}
        {isOptionalField && isOptionalField(input.name) && (
          <span className="text-xs text-muted-foreground"> (اختياري)</span>
        )}
      </FormLabel>
      <FormControl>
        <Input
          id={input.name}
          type={input.type}
          placeholder={input.placeholder}
          autoComplete={"on"}
          {...field}
          min={0}
          onChange={(e) => field.onChange(e.target.value)}
          value={field.value as string | undefined}
          className="border-muted py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-muted-foreground placeholder:text-sm"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default InputFormItem;
