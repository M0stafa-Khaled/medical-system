import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import {
  ICreatePrescription,
  IUpdatePrescription,
} from "@/features/dashboard/prescriptions/types";
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
    mutationFn: (prescription: ICreatePrescription) =>
      createDoctorPrescription(prescription),
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
    mutationFn: (prescription: IUpdatePrescription) =>
      updateDoctorPrescription(prescription),
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
    mutationFn: ({ id }: { id: string }) => deleteDoctorPrescription({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PRESCRIPTIONS],
      });
    },
  });
};
