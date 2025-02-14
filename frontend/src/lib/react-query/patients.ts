import { deletePatient, getAllPatients, getPatientById } from "@/api/patients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";

export const useGetAllPatients = (token: string, page: number = 1) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENTS, page],
    queryFn: () => getAllPatients({ token, page }),
  });
};

export const useGetPatientById = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ONE_PATIENT, id],
    queryFn: () => getPatientById({ id, token }),
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deletePatient({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
    },
  });
};
