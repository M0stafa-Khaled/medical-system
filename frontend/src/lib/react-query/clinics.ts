import {
  createClinic,
  updateClinic,
  deleteClinic,
  getAllClinics,
} from "@/api/clinics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import { ICreateClinic } from "@/interfaces";

export const useGetAllClinics = (token: string, id?: string) => {
  return useQuery({
    queryFn: () => getAllClinics(token),
    queryKey: [Query_Keys.GET_ALL_CLINICS, id, Query_Keys.GET_ONE_DOCTOR],
  });
};

export const useCreateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status, token }: ICreateClinic) =>
      createClinic({ name, status, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};

export const useDeleteClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string | null }) =>
      deleteClinic({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};

export const useUpdateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, status, token }: ICreateClinic) =>
      updateClinic({ id, name, status, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};
