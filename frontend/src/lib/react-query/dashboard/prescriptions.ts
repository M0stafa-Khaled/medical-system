import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import {
  ICreatePrescription,
  IUpdatePrescription,
} from "@/interfaces/dashboard/prescription";
import {
  createPrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
} from "@/services/dashboard/prescriptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPrescriptions = ({
  token,
  filter,
  page,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS, filter, page],
    queryFn: () => getAllPrescriptions({ token, filter, page }),
  });

export const useGetPrescriptionById = ({
  token,
  id,
}: {
  id: string;
  token: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PRESCRIPTION, id],
    queryFn: () => getPrescriptionById({ token, id }),
  });

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prescription, token }: ICreatePrescription) =>
      createPrescription({ prescription, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};

export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prescription, token, id }: IUpdatePrescription) =>
      updatePrescription({ prescription, token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_PRESCRIPTION],
      });
    },
  });
};

export const useDeletePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { id: string; token: string }) =>
      deletePrescription({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};
