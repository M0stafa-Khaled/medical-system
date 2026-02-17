import axiosAPI from "@/config/axios.config";
import { IBookingsRes } from "@/features/dashboard/bookings/types";

export const getDoctorBookings = async ({
  token,
  clinicId,
}: {
  token: string;
  clinicId: number;
}): Promise<IBookingsRes> => {
  const { data } = await axiosAPI.get(`/${clinicId}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
