import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { CalendarIcon } from "lucide-react";
import cookieServices from "@/shared/utils/cookieServices";
import { useGetAllTreasuries } from "@/shared/lib/react-query/dashboard/treasuries";
import { IExpensesFilter } from "@/features/dashboard/expenses/types";
import { useCallback } from "react";

interface IProps {
  filters: IExpensesFilter;
  setFilters: (filters: IExpensesFilter) => void;
}
export const ExpensesFilters = ({ filters, setFilters }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: treasuries } = useGetAllTreasuries({ token });

  const handleFilterChange = useCallback(
    (key: string, value: string | null) =>
      setFilters({ ...filters, [key]: value }),
    [filters, setFilters]
  );

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث برقم الإيصال"
        className="border-muted placeholder:text-muted-foreground h-auto py-2 placeholder:h-12 placeholder:text-sm"
        type="search"
        value={filters.code}
        onChange={(e) => handleFilterChange("code", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم الموظف"
        className="border-muted placeholder:text-muted-foreground h-auto py-2 placeholder:h-12 placeholder:text-sm"
        type="search"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      {/* Treasuries */}
      <Select
        value={filters.treasury}
        onValueChange={(value) => handleFilterChange("treasury", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`border-muted0 h-12! ${
            filters.treasury
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الخزينة"
            className={`text-muted-foreground py-2`}
          />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          {treasuries?.data.map((treasury) => (
            <SelectItem
              key={treasury.id}
              value={treasury.name}
              className="cursor-pointer py-2.5"
            >
              {treasury.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={filters.status}
        onValueChange={(value) => handleFilterChange("status", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`border-muted h-12! ${
            filters.status
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الحالة"
            className={`text-muted-foreground py-2`}
          />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          <SelectItem value="1" className="cursor-pointer py-2.5">
            معتمد
          </SelectItem>
          <SelectItem value="0" className="cursor-pointer py-2.5">
            ملغي
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Created Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            className={
              "hover:bg-background hover:text-foreground h-auto w-full justify-start"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.created_at ? (
              format(new Date(filters.created_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">تاريخ الصرف</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-muted p-0" align="start">
          <Calendar
            mode="single"
            className="w-full"
            selected={
              filters.created_at ? new Date(filters.created_at) : undefined
            }
            onSelect={(date) =>
              handleFilterChange(
                "created_at",
                date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : null
              )
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
