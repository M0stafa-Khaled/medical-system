import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
} from "./api";
import { IGetWithParams } from "@/shared/types";
import { ICreateBooking, IUpdateBookingStatus } from "./types";

export const useGetAllBookings = ({ page = 1, filter, sort }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_BOOKINGS, filter, page, sort],
    queryFn: () => getAllBookings({ page, filter, sort }),
  });

export const useGetBookingById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_BOOKING, id],
    queryFn: () => getBookingById({ id }),
    enabled: !!id,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: ICreateBooking) => createBooking(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, id }: { id: number; formData: ICreateBooking }) =>
      updateBooking(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ status, id }: IUpdateBookingStatus) =>
      updateBookingStatus({ status, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteBooking({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};
