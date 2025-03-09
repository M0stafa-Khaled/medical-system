import DataLoader from "@/components/ui/DataLoader";
import { useGetUserProfile } from "@/lib/react-query/profile";
import cookieServices from "@/utils/cookieServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();
  const { data: user, isLoading, isError } = useGetUserProfile(token as string);

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الملف الشخصى");
      navigate("/dashboard/employees");
      return;
    }

    if (!user?.status && user?.message) {
      toast.error(user?.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [user, isError, navigate]);

  if (isLoading) return <DataLoader />;

  return <div className="text-white">{user?.data?.name}</div>;
};

export default Profile;
