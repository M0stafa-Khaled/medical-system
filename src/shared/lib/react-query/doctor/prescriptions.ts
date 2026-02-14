import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import {
  ICreatePrescription,
  IUpdatePrescription,
} from "@/interfaces/dashboard/prescription";
import {
  createDoctorPrescription,
  deleteDoctorPrescription,
  getAllDoctorPrescriptions,
  getDoctorPrescriptionById,
  updateDoctorPrescription,
} from "@/services/doctor/doctorPrescriptions";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllDoctorPrescriptions = ({
  token,
  filter,
  page,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS, filter, page],
    queryFn: () => getAllDoctorPrescriptions({ token, filter, page }),
  });

export const useGetDoctorPrescriptionById = ({
  token,
  id,
}: {
  id: string;
  token: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_PRESCRIPTION, id],
    queryFn: () => getDoctorPrescriptionById({ token, id }),
  });

export const useCreateDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prescription, token }: ICreatePrescription) =>
      createDoctorPrescription({ prescription, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};

export const useUpdateDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prescription, token, id }: IUpdatePrescription) =>
      updateDoctorPrescription({ prescription, token, id }),
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

export const useDeleteDoctorPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { id: string; token: string }) =>
      deleteDoctorPrescription({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};
