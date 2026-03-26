import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type OverviewStatCardProps = {
  title: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone: "cyan" | "emerald" | "amber" | "indigo";
};

const toneClasses: Record<OverviewStatCardProps["tone"], string> = {
  cyan: "border-cyan-500/30 bg-cyan-500/5",
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  amber: "border-amber-500/30 bg-amber-500/5",
  indigo: "border-indigo-500/30 bg-indigo-500/5",
};

export const OverviewStatCard = ({
  title,
  value,
  hint,
  icon: Icon,
  tone,
}: OverviewStatCardProps) => {
  return (
    <Card className={toneClasses[tone]}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="text-muted-foreground mt-1 text-xs">{hint}</p>
      </CardContent>
    </Card>
  );
};
