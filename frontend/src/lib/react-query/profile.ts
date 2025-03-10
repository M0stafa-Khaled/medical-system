import { useQuery } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import { getUserProfile } from "@/services/profile/profile";

export const useGetUserProfile = (token: string) => {
  return useQuery({
    queryFn: () => getUserProfile(token),
    queryKey: [Query_Keys.GET_USER_PROFILE],
  });
};
