import {
  transferTreasuries,
  createTreasury,
  deleteTreasury,
  getAllTreasuries,
  updateTreasury,
} from "./api";
import { IGetWithParams } from "@/shared/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import { IConvertTreasuries, ICreateTreasury, IUpdateTreasury } from "./types";

export const useGetAllTreasuries = ({ search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TREASURIES, search],
    queryFn: () => getAllTreasuries({ search }),
  });

export const useCreateTreasury = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, status }: ICreateTreasury) =>
      createTreasury({ name, status }),
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
    mutationFn: (treasury: IUpdateTreasury) => updateTreasury(treasury),
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
    mutationFn: ({ from_treasury, to_treasury, amount }: IConvertTreasuries) =>
      transferTreasuries({ from_treasury, amount, to_treasury }),
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
    mutationFn: ({ id }: { id: string }) => deleteTreasury({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TREASURIES],
      });
    },
  });
};
