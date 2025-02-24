import { IFormInput } from "@/interfaces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { ChangeEvent } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
  isOptionalField: (name: string) => boolean;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => void;
}
const FileFormItem = ({
  input,
  field,
  isOptionalField,
  handleFileChange,
}: IProps) => {
  return (
    <FormItem>
      <FormLabel htmlFor={input.name}>
        {input.label}
        {isOptionalField(input.name) && (
          <span className="text-xs text-muted-foreground"> (اختياري)</span>
        )}
      </FormLabel>
      <FormControl>
        <div className="flex flex-col gap-4">
          <Input
            id={input.name}
            type="file"
            accept={input.accept}
            {...field}
            onChange={(e) => handleFileChange(e, field.onChange)}
            value={undefined}
            className="cursor-pointer border-muted h-auto py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FileFormItem;
