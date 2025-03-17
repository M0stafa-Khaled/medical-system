import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../../queryKeys";
import {
  createWorkingDay,
  deleteWorkingDay,
  getAllWorkingDays,
  getWorkingDayById,
  updateWorkingDay,
} from "@/services/dashboard/doctors/workingDays";
import { ICreateWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";

export const useGetAllWorkingDays = ({
  doctorId,
  token,
  search,
}: {
  doctorId: string;
  token: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS, doctorId, search],
    enabled: !!doctorId,
    queryFn: () =>
      getAllWorkingDays({
        doctorId,
        token,
        search,
      }),
    staleTime: 30 * 1000,
  });
};

export const useGetWorkingDayById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_DOCTOR_WORKING_DAYS, id],
    queryFn: () => getWorkingDayById({ token, id }),
  });

export const useCreateWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: ICreateWorkingDay) =>
      createWorkingDay({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS],
      });
    },
  });
};

export const useUpdateWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: ICreateWorkingDay) =>
      updateWorkingDay({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS],
      });
    },
  });
};

export const useDeleteWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteWorkingDay({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS],
      });
    },
  });
};
