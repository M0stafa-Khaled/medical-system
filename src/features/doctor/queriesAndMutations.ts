import Query_Keys from "@/shared/enums/queryKeys";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createDoctorPrescription,
  deleteDoctorPrescription,
  getAllDoctorPrescriptions,
  getDoctorBookings,
  getDoctorBookingsChart,
  getDoctorClinics,
  getDoctorPrescriptionById,
  getDoctorPrescriptionsChart,
  getDoctorTransactionsChart,
  getDoctorWidgets,
  updateDoctorPrescription,
} from "./api";
import { IGetWithParams } from "@/shared/types";
import {
  ICreatePrescription,
  IUpdatePrescription,
} from "../dashboard/prescriptions/types";

export const useGetDoctorClinics = () =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_CLINICS],
    queryFn: () => getDoctorClinics(),
  });

export const useGetDoctorBookings = ({ clinicId }: { clinicId: string }) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_BOOKINGS, clinicId],
    queryFn: () => getDoctorBookings({ clinicId }),
  });

export const useGetDoctorBookingsChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_BOOKINGS_CHART, filter],
    queryFn: () => getDoctorBookingsChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetDoctorPrescriptionsChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_PRESCRIPTIONS_CHART, filter],
    queryFn: () => getDoctorPrescriptionsChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetDoctorTransactionsChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TREASURIES_CHART, filter],
    queryFn: () => getDoctorTransactionsChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetDoctorWidgets = () =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_WIDGETS],
    queryFn: () => getDoctorWidgets(),
    placeholderData: keepPreviousData,
  });

export const useGetAllDoctorPrescriptions = ({
  filter,
  page,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS, filter, page],
    queryFn: () => getAllDoctorPrescriptions({ filter, page }),
  });

export const useGetDoctorPrescriptionById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PRESCRIPTION, id],
    queryFn: () => getDoctorPrescriptionById({ id }),
  });

export const useCreateDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prescription: ICreatePrescription) =>
      createDoctorPrescription(prescription),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};

export const useUpdateDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prescription: IUpdatePrescription) =>
      updateDoctorPrescription(prescription),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PRESCRIPTION],
      });
    },
  });
};

export const useDeleteDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDoctorPrescription({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PRESCRIPTION],
      });
    },
  });
};
