import { Card, CardContent } from "@/shared/components/ui/card";
import { IPermission } from "@/features/auth/types";
import { LucideShield, LucideCheckCircle } from "lucide-react";

interface IProps {
  permissions: IPermission[];
}

export const EmployeePermissions = ({ permissions }: IProps) => {
  if (!permissions || permissions.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
        <LucideShield className="mb-4 h-12 w-12 opacity-50" />
        <p className="text-lg font-medium">لا توجد صلاحيات محددة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {permissions.map((perm) => (
        <Card
          key={perm.id}
          className="hover:border-primary/20 border-0 shadow-md transition-all hover:shadow-lg"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
              <LucideCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium">{perm.name}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
