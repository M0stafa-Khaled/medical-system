import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IFormInput } from "@/interfaces";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
}

const PasswordFormItem = ({ field, input }: IProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormItem>
      <FormLabel className="text-black" htmlFor={input.name}>
        {input.label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <button
            type="button"
            className="text-black grid place-items-center absolute text-blue-gray-500 top-2/4 left-3 -translate-y-2/4 w-5 h-5"
          >
            {showPassword ? (
              <Eye size={20} onClick={() => setShowPassword((prev) => !prev)} />
            ) : (
              <EyeOff
                size={20}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </button>
          <Input
            id={input.name}
            placeholder={input.placeholder}
            type={showPassword ? "text" : input.type}
            {...field}
            className="pr-2 pl-9 py-3.5 focus-visible:ring-[#bababa] placeholder:h-14 h-auto border-black/20 text-black placeholder:text-black/50"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PasswordFormItem;
