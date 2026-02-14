import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { IFormInput } from "@/shared/types";
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
            className="text-blue-gray-500 absolute top-2/4 left-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-black"
            name={showPassword ? "اخفاء كلمة المرور" : "عرض كلمة المرور"}
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
            className="h-auto border-black/20 py-2.5 pr-2 pl-9 text-black placeholder:h-14 placeholder:text-sm placeholder:text-black/50 focus-visible:ring-[#bababa] md:py-3.5"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PasswordFormItem;
