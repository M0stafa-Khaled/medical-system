import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { IClinic } from "@/features/dashboard/clinics/types";
import { LucideMapPin, LucideHash } from "lucide-react";

interface IProps {
  clinics: IClinic[];
}

export const DoctorClinics = ({ clinics }: IProps) => {
  if (!clinics || clinics.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
        <LucideMapPin className="mb-4 h-12 w-12 opacity-50" />
        <p className="text-lg font-medium">لا توجد عيادات مسجلة</p>
        <p className="text-sm">سيتم إضافة العيادات قريباً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {clinics.map((clinic) => (
        <Card
          key={clinic.id}
          className="border-0 shadow-md transition-shadow hover:shadow-lg"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
              <LucideMapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold">{clinic.name}</h4>
              <div className="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <LucideHash className="h-3 w-3" />
                  {clinic.virtual_number}
                </span>
                <Badge
                  variant={clinic.status ? "default" : "secondary"}
                  className="text-xs"
                >
                  {clinic.status ? "نشط" : "غير نشط"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
