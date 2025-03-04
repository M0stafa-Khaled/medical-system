import {
  transferTreasuries,
  createTreasury,
  deleteTreasury,
  getAllTreasuries,
  updateTreasury,
} from "@/api/treasuries";
import { IGetTokenPageSearch } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import { IConvertTreasuries, ICreateTreasury } from "@/interfaces/treasury";

export const useGetAllTreasuries = ({ token, search }: IGetTokenPageSearch) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TREASURIES, search],
    queryFn: () => getAllTreasuries({ token, search }),
  });

export const useCreateTreasury = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status, token }: ICreateTreasury) =>
      createTreasury({ name, status, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TREASURIES],
      });
    },
  });
};

export const useUpdateTreasury = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, status, token }: ICreateTreasury) =>
      updateTreasury({ id, name, status, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TREASURIES],
      });
    },
  });
};

export const useTransferTreasuries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ from_treasury, to_treasury, token }: IConvertTreasuries) =>
      transferTreasuries({ token, from_treasury, to_treasury }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TREASURIES],
      });
    },
  });
};

export const useDeleteTreasury = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { token: string; id: string }) =>
      deleteTreasury({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TREASURIES],
      });
    },
  });
};
