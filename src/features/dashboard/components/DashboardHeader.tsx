import cookieServices from "@/shared/utils/cookieServices";

export const DashboardHeader = () => {
  const role = cookieServices.getUser()!.role;
  const title = role === "admin" ? "لوحة تحكم المدير" : "لوحة تحكم الموظف";
  const description =
    role === "admin"
      ? "نظرة عامة على أداء المركز الطبي والعمليات."
      : "متابعة الخزنة والعمليات المالية.";
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};
