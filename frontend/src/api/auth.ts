import axiosInstanceAPI from "@/config/axios.config";

export const loginAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstanceAPI.post(
    "/auth",
    {
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return data;
};
