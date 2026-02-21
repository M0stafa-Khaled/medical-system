import { ICreateDoctor, ICreateDoctorAction } from "./types";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  createDoctorAction,
  createDoctorTransaction,
  deleteDoctorAction,
  getDoctorActions,
  getDoctorTransactions,
  updateDoctorAction,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
export const useGetAllDoctors = ({ page, search }: IGetWithParams) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTORS, page, search],
    queryFn: () => getAllDoctors({ page, search }),
  });
};

export const useGetDoctorById = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => getDoctorById({ id }),
    queryKey: [Query_Keys.GET_ONE_DOCTOR, id],
    enabled: !!id,
  });

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateDoctor }) =>
      createDoctor({
        dataForm: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateDoctor }) =>
      updateDoctor({
        dataForm: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteDoctor({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};

export const useGetDoctorTransactions = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TRANSACTIONS, id],
    queryFn: () => getDoctorTransactions({ id }),
    enabled: !!id,
  });

export const useCreateDoctorTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => createDoctorTransaction({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.DOCTOR_TRANSACTIONS],
      });
    },
  });
};

export const useGetDoctorActions = ({ doctorId }: { doctorId: string }) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS, doctorId],
    queryFn: () => getDoctorActions({ doctorId }),
    enabled: !!doctorId,
  });
};

export const useCreateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData }: ICreateDoctorAction) =>
      createDoctorAction({ formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};

export const useUpdateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, id }: ICreateDoctorAction) =>
      updateDoctorAction({ formData, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};

export const useDeleteDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDoctorAction({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};
