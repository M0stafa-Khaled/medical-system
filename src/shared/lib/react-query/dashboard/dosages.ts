import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { ICreateDosage, IUpdateDosage } from "@/interfaces/dashboard/dosages";
import {
  createDosage,
  deleteDosage,
  getAllDosages,
  updateDosage,
} from "@/services/dosages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllDosages = ({ token, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DOSAGES, search],
    queryFn: () => getAllDosages({ token, search }),
  });

export const useCreateDosage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, name }: ICreateDosage) =>
      createDosage({ token, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOSAGES],
      });
    },
  });
};

export const useUpdateDosage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, name, id }: IUpdateDosage) =>
      updateDosage({ token, name, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOSAGES],
      });
    },
  });
};

export const useDeleteDosage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deleteDosage({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOSAGES],
      });
    },
  });
};
