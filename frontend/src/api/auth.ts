import axiosInstanceAPI from "@/config/axios.config";

export const loginAdmin = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) => {
  const { data } = await axiosInstanceAPI.post(
    "/auth",
    {
      email,
      password,
      role,
    },
    {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    }
  );
  return data;
};
