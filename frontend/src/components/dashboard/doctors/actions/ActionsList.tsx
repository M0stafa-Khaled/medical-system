import { useGetDoctorActions } from "@/lib/react-query/doctorActions";
import cookieServices from "@/utils/cookieServices";
import ActionCard from "./ActionCard";
import ActionSkeleton from "@/components/ui/ActionSkeleton";

interface IProps {
  doctorId: string;
}

const ActionsList = ({ doctorId }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: actions, isLoading } = useGetDoctorActions({ token, doctorId });

  if (isLoading) return <ActionSkeleton />;
  return (
    <div>
      {!actions?.data?.items.length ? (
        <p className="text-sm text-center text-black dark:text-white py-5 font-medium">
          لا يوجد إجراءات
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {actions?.data?.items.map((action) => (
            <ActionCard key={action.id} action={action} doctorId={doctorId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionsList;
