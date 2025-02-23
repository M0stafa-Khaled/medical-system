import {
  createDoctorAction,
  deleteDoctorAction,
  getDoctorActionsById,
  updateDoctorAction,
} from "@/api/doctorActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import { IActionProps } from "@/interfaces/doctorActions";

export const useGetDoctorActions = ({
  doctorId,
  token,
}: {
  doctorId: string;
  token: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.DOCTOR_ACTIONS],
    queryFn: () => getDoctorActionsById({ doctorId, token }),
  });
};

export const useCreateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: IActionProps) =>
      createDoctorAction({ formData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.DOCTOR_ACTIONS],
      });
    },
  });
};

export const useUpdateDoctorAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token, id }: IActionProps) =>
      updateDoctorAction({ formData, token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.DOCTOR_ACTIONS],
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
        queryKey: [Query_Keys.DOCTOR_ACTIONS],
      });
    },
  });
};
