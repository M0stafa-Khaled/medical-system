import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "./api";
import Query_Keys from "@/shared/enums/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ICreateEmployee } from "./types";
import { type IGetWithParams } from "@/shared/types";

export const useGetAllEmployees = ({
  token,
  page = 1,
  search,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EMPLOYEES, page, search],
    queryFn: () => getAllEmployees({ token, page, search }),
  });

export const useGetEmployeeById = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => getEmployeeById({ id }),
    queryKey: [Query_Keys.GET_ONE_EMPLOYEE, id],
    enabled: !!id,
  });

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateEmployee }) =>
      createEmployee({ dataForm: data }),
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
    mutationFn: ({ data }: { data: ICreateEmployee }) =>
      updateEmployee({ dataForm: data }),
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
    mutationFn: ({ id }: { id: number }) => deleteEmployee({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EMPLOYEES],
      });
    },
  });
};
