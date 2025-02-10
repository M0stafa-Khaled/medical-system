import { IAddDoctor } from "@/interfaces";
import {
  addDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "@/api/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";

export const useGetAllDoctors = (token: string) => {
  return useQuery({
    queryFn: () => getAllDoctors(token),
    queryKey: [Query_Keys.GET_ALL_DOCTORS],
  });
};

export const useGetDoctorById = ({
  token,
  id,
}: {
  id: string;
  token: string;
}) => {
  return useQuery({
    queryFn: () => getDoctorById({ id, token }),
    queryKey: [Query_Keys.GET_ONE_DOCTOR, id],
    refetchOnMount: true,
    enabled: !!id
  });
};

export const useAddDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: IAddDoctor; token: string }) =>
      addDoctor({
        dataForm: data,
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS, Query_Keys.GET_ONE_DOCTOR],
      });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: IAddDoctor; token: string }) =>
      updateDoctor({
        dataForm: data,
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS, Query_Keys.GET_ONE_DOCTOR],
      });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string | null }) =>
      deleteDoctor({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};
