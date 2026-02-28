import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
import { ControllerRenderProps } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
  isOptionalField?: (name: string) => boolean;
  resize?: boolean;
}

const TextareaFormItem = ({
  input,
  field,
  isOptionalField,
  resize = false,
}: IProps) => {
  return (
    <FormItem>
      <FormLabel htmlFor={input.name}>
        {input.label}
        {isOptionalField && isOptionalField(input.name) && (
          <span className="text-muted-foreground text-xs"> (اختياري)</span>
        )}
      </FormLabel>
      <FormControl>
        <Textarea
          id={input.name}
          placeholder={input.placeholder}
          autoComplete={"on"}
          {...field}
          onChange={(e) => field.onChange(e.target.value)}
          value={field.value as string | undefined}
          className={`border-muted placeholder:text-muted-foreground h-auto max-w-full py-3 text-black placeholder:h-14 placeholder:text-sm dark:text-white ${
            resize ? "resize" : "resize-none"
          }`}
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TextareaFormItem;
