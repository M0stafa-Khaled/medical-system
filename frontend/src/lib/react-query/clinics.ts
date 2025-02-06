import {
  createClinic,
  updateClinic,
  deleteClinic,
  getAllClinics,
} from "@/api/clinics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";

export const useGetAllClinics = () => {
  return useQuery({
    queryFn: () => getAllClinics(),
    queryKey: [Query_Keys.GET_ALL_CLINICS],
  });
};

export const useCreateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status }: { name: string; status: boolean }) =>
      createClinic({ name, status }),
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
    mutationFn: (id: number) => deleteClinic(id),
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
    mutationFn: ({
      id,
      name,
      status,
    }: {
      id: number;
      name: string;
      status: boolean;
    }) => updateClinic({ id, name, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_CLINICS],
      });
    },
  });
};
