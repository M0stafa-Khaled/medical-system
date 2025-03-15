import {
  ICreateBooking,
  IUpdateBooking,
} from "../../../interfaces/dashboard/bookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "@/services/dashboard/bookings";
import { IGetWithParams } from "@/interfaces";

export const useGetAllBookings = ({
  token,
  page = 1,
  filter,
  sort,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_BOOKINGS, filter, page, sort],
    staleTime: 30 * 1000,
    queryFn: () => getAllBookings({ token, page, filter, sort }),
  });

export const useGetBookingById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_BOOKING, id],
    queryFn: () => getBookingById({ id, token }),
    enabled: !!id,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, formData }: ICreateBooking) =>
      createBooking({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, formData, id }: IUpdateBooking) =>
      updateBooking({ formData, token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deleteBooking({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
    },
  });
};
