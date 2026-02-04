import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import {
  ICreatePatientBooking,
  IUpdatePatientBooking,
} from "@/interfaces/patient/patientBookings";
import {
  createPatientBooking,
  deletePatientBooking,
  getAllPatientBookings,
  getPatientBookingById,
  updatePatientBooking,
} from "@/services/patient/patientBookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPatientBookings = ({
  token,
  filter,
  page,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENT_BOOKINGS, filter, page],
    queryFn: () => getAllPatientBookings({ token, filter, page }),
  });

export const useGetPatientBookingById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PATIENT_BOOKING, id],
    queryFn: () => getPatientBookingById({ token, id }),
  });

export const useCreatePatientBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ booking, token }: ICreatePatientBooking) =>
      createPatientBooking({ token, booking }),
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
    mutationFn: ({ booking, token, id }: IUpdatePatientBooking) =>
      updatePatientBooking({ token, booking, id }),
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
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};

export const useDeletePatientBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deletePatientBooking({ token, id }),
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
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_BOOKING],
      });
    },
  });
};
