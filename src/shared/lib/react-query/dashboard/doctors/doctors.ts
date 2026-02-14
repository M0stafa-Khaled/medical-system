import { ICreateDoctor } from "@/interfaces/dashboard/doctors/doctor";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "@/services/dashboard/doctors/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";

export const useGetAllDoctors = ({ token, page, search }: IGetWithParams) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTORS, page, search],
    queryFn: () => getAllDoctors({ token, page, search }),
  });
};

export const useGetDoctorById = ({
  token,
  id,
}: {
  id: string;
  token: string;
}) =>
  useQuery({
    queryFn: () => getDoctorById({ id, token }),
    queryKey: [Query_Keys.GET_ONE_DOCTOR, id],
    enabled: !!id,
  });

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: ICreateDoctor; token: string }) =>
      createDoctor({
        dataForm: data,
        token,
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
    mutationFn: ({ data, token }: { data: ICreateDoctor; token: string }) =>
      updateDoctor({
        dataForm: data,
        token,
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
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteDoctor({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTORS],
      });
    },
  });
};
