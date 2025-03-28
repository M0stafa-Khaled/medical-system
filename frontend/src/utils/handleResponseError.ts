import { toast } from "react-toastify";

const handleResErr = (error: any) => {
  if (error?.response?.data.errors) {
    Object.keys(error.response.data.errors).forEach((key) => {
      error?.response?.data.errors[key].forEach((error: string) =>
        toast.error(error, {
          autoClose: 5000,
        })
      );
    });
  }
  if (error?.response?.data.message && !error?.response?.data.errors) {
    toast.error(error?.response?.data.message, {
      autoClose: 5000,
    });
  }
};

export default handleResErr;
