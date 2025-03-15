import {
  createDoctorAction,
  deleteDoctorAction,
  getDoctorActions,
  updateDoctorAction,
} from "@/services/dashboard/doctors/doctorActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../../queryKeys";
import { IDoctorActionProps } from "@/interfaces/dashboard/doctors/doctorActions";

export const useGetDoctorActions = ({
  doctorId,
  token,
}: {
  doctorId: string;
  token: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
    queryFn: () => getDoctorActions({ doctorId, token }),
    enabled: !!doctorId,
  });
};

export const useCreateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: IDoctorActionProps) =>
      createDoctorAction({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};

export const useUpdateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token, id }: IDoctorActionProps) =>
      updateDoctorAction({ formData, token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};

export const useDeleteDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deleteDoctorAction({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_DOCTOR_ACTIONS],
      });
    },
  });
};
