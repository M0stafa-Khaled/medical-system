import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "@/api/employees";
import Query_Keys from "./queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAddEmployee } from "@/interfaces";

export const useGetAllEmployees = (token: string) => {
  return useQuery({
    queryFn: () => getAllEmployees(token as string),
    queryKey: [Query_Keys.GET_ALL_EMPLOYEES],
  });
};

export const useGetEmployeeById = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return useQuery({
    queryFn: () => getEmployeeById({ id, token }),
    queryKey: [Query_Keys.GET_ONE_EMPLOYEE, id],
    refetchOnMount: true,
    enabled: !!id,
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: IAddEmployee; token: string }) =>
      addEmployee({ dataForm: data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EMPLOYEES],
      });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: IAddEmployee; token: string }) =>
      updateEmployee({ dataForm: data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EMPLOYEES],
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteEmployee({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EMPLOYEES],
      });
    },
  });
};
