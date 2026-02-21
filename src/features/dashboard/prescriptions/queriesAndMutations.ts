import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import {
  ICreatePrescription,
  IUpdatePrescription,
} from "@/features/dashboard/prescriptions/types";
import {
  createPrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPrescriptions = ({ filter, page }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS, filter, page],
    queryFn: () => getAllPrescriptions({ filter, page }),
  });

export const useGetPrescriptionById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PRESCRIPTION, id],
    queryFn: () => getPrescriptionById({ id }),
  });

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prescription: ICreatePrescription) =>
      createPrescription(prescription),
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
    mutationFn: (prescription: IUpdatePrescription) =>
      updatePrescription(prescription),
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
    mutationFn: ({ id }: { id: string }) => deletePrescription({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};
