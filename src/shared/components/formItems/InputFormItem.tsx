import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { IFormInput } from "@/shared/types";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
  isOptionalField?: (name: string) => boolean;
}

const InputFormItem = ({ input, field, isOptionalField }: IProps) => {
  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel htmlFor={input.name}>
        {input.label}
        {isOptionalField && isOptionalField(input.name) && (
          <span className="text-muted-foreground text-xs"> (اختياري)</span>
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
          className="border-muted placeholder:text-muted-foreground h-auto py-2.5 placeholder:h-14 placeholder:text-sm"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default InputFormItem;
