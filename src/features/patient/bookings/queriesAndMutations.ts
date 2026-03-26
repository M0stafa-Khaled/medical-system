import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import {
  createPatientBooking,
  deletePatientBooking,
  getAllPatientBookings,
  getPatientBookingById,
  updatePatientBooking,
} from "./api";
import {
  ICreatePatientBooking,
  IDeletePatientBooking,
  IUpdatePatientBooking,
} from "./types";

export const useGetAllPatientBookings = ({
  page = 1,
  filter,
  sort = "-date",
}: {
  page?: number;
  filter?: Record<string, string>;
  sort?: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS, filter, page, sort],
    queryFn: () => getAllPatientBookings({ filter, page, sort }),
  });

export const useGetPatientBookingById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PATIENT_BOOKING, id],
    queryFn: () => getPatientBookingById({ id }),
    enabled: !!id,
  });

export const useCreatePatientBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (booking: ICreatePatientBooking) =>
      createPatientBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
    },
  });
};

export const useUpdatePatientBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (booking: IUpdatePatientBooking) =>
      updatePatientBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PATIENT_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.GET_ONE_BOOKING] });
    },
  });
};

export const useDeletePatientBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: IDeletePatientBooking) => deletePatientBooking({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PATIENT_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.GET_ONE_BOOKING] });
    },
  });
};
