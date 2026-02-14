import { createClinic, updateClinic, deleteClinic, getAllClinics } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import type { ICreateClinic, IUpdateClinic } from "./types";
import { IGetWithParams } from "@/shared/types";

export const useGetAllClinics = ({ filter }: IGetWithParams) => {
  return useQuery({
    queryFn: () => getAllClinics({ filter }),
    queryKey: [Query_Keys.GET_ALL_CLINICS, filter],
  });
};

export const useCreateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status, virtual_number }: ICreateClinic) =>
      createClinic({ name, status, virtual_number }),
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
    mutationFn: ({ id }: { id: number }) => deleteClinic({ id }),
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
    mutationFn: ({ id, name, status, virtual_number }: IUpdateClinic) =>
      updateClinic({ id, name, status, virtual_number }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};
