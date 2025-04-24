import axiosInstanceAPI from "@/config/axios.config";
import { IBookingsRes } from "@/interfaces/dashboard/bookings";

export const getDoctorBookings = async ({
  token,
  clinicId,
}: {
  token: string;
  clinicId: number;
}): Promise<IBookingsRes> => {
  const { data } = await axiosInstanceAPI.get(`/${clinicId}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
