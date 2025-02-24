import { IAddDoctor } from "@/interfaces/doctor";
import {
  addDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "@/api/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";

export const useGetAllDoctors = ({
  token,
  page,
  search,
}: {
  token: string;
  page: number;
  search: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTORS, page, search],
    queryFn: () => getAllDoctors({ token, page, search }),
    staleTime: 1000,
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
    enabled: !!id,
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
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteDoctor({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};
