import { UseFormReturn } from "react-hook-form";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  isValidFileType,
} from "@/utils/file";

export const useUploadImgHandler = (form: UseFormReturn<any>) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidFileType(file, ACCEPTED_IMAGE_TYPES)) {
        form.setError(e.target.name, {
          message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png أو .svg",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        form.setError(e.target.name, {
          message: "حجم الصورة يجب أن يكون أقل من 5MB",
        });
        return;
      }
      fieldChange(file);
    }
  };

  return { handleFileChange };
};
