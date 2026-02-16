import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import {
  createWorkingDay,
  deleteWorkingDay,
  getAllWorkingDays,
  getWorkingDayById,
  updateWorkingDay,
} from "./api";
import { ICreateWorkingDay, IUpdateWorkingDay } from "./types";

export const useGetAllWorkingDays = ({
  doctorId,
  search,
}: {
  doctorId: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS, doctorId, search],
    enabled: !!doctorId,
    queryFn: () =>
      getAllWorkingDays({
        doctorId,
        search,
      }),
  });
};

export const useGetWorkingDayById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_DOCTOR_WORKING_DAYS, id],
    queryFn: () => getWorkingDayById({ id }),
  });

export const useCreateWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateWorkingDay) => createWorkingDay(data),
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
    mutationFn: (data: IUpdateWorkingDay) => updateWorkingDay(data),
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
    mutationFn: ({ id }: { id: number }) => deleteWorkingDay({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_WORKING_DAYS],
      });
    },
  });
};
