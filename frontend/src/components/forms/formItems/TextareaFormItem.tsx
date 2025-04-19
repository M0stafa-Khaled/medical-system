import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { ControllerRenderProps } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

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
          <span className="text-xs text-muted-foreground"> (اختياري)</span>
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
          className={`border-muted py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-muted-foreground placeholder:text-sm max-w-full ${
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
