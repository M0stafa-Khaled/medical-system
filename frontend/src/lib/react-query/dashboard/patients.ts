import {
  addPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "@/services/dashboard/patients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import { IAddPatient } from "@/interfaces/dashboard/patient";
import { IGetWithParams } from "@/interfaces";

export const useGetAllPatients = ({
  token,
  page = 1,
  search = "",
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENTS, page, search],
    queryFn: () => getAllPatients({ token, page, search }),
    staleTime: 30 * 1000,
  });

export const useGetPatientById = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PATIENT, id],
    queryFn: () => getPatientById({ id, token }),
    enabled: !!id,
  });

export const useAddPatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: IAddPatient }) =>
      addPatient({ token, dataForm: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
    },
  });
};
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: IAddPatient }) =>
      updatePatient({ token, dataForm: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deletePatient({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
    },
  });
};
