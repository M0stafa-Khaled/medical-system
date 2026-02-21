import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { ICreateDosage, IUpdateDosage } from "./types";
import { createDosage, deleteDosage, getAllDosages, updateDosage } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllDosages = ({ search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DOSAGES, search],
    queryFn: () => getAllDosages({ search }),
  });

export const useCreateDosage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name }: ICreateDosage) => createDosage({ name }),
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
    mutationFn: ({ name, id }: IUpdateDosage) => updateDosage({ name, id }),
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
    mutationFn: ({ id }: { id: string }) => deleteDosage({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOSAGES],
      });
    },
  });
};
