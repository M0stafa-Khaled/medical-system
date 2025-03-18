import {
  createClinic,
  updateClinic,
  deleteClinic,
  getAllClinics,
} from "@/services/dashboard/clinics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import { ICreateClinic } from "@/interfaces/dashboard/clinic";
import { IGetWithParams } from "@/interfaces";

export const useGetAllClinics = ({ token, search }: IGetWithParams) => {
  return useQuery({
    queryFn: () => getAllClinics({ token, search }),
    queryKey: [Query_Keys.GET_ALL_CLINICS, search],
    staleTime: 30 * 1000,
  });
};

export const useCreateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status, token, virtual_number }: ICreateClinic) =>
      createClinic({ name, status, token, virtual_number }),
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
    mutationFn: ({ id, token }: { id: number; token: string }) =>
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
    mutationFn: ({ id, name, status, virtual_number, token }: ICreateClinic) =>
      updateClinic({ id, name, status, token, virtual_number }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};
