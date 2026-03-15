import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import { ICreatePatient } from "./types";
import { IGetWithParams } from "@/shared/types";

export const useGetAllPatients = ({
  page = 1,
  search = "",
  limit,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENTS, page, search, limit],
    queryFn: () => getAllPatients({ page, search, limit }),
  });

export const useGetPatientById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PATIENT, id],
    queryFn: () => getPatientById({ id }),
    enabled: !!id,
  });

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreatePatient }) =>
      createPatient({ dataForm: data }),
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
    mutationFn: ({ data }: { data: ICreatePatient }) =>
      updatePatient({ dataForm: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PATIENT],
      });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePatient({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PATIENT],
      });
    },
  });
};
