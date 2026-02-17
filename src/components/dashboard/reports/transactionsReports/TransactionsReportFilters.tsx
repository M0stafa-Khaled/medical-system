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
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { ITransactionsReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: ITransactionsReportFilter;
  setFilters: (filters: ITransactionsReportFilter) => void;
}
const TransactionsFilters = ({ filters, setFilters }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: treasuries } = useGetAllTreasuries({ token });

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم الخدمة"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.action}
        onChange={(e) => handleFilterChange("action", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم الموظف"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />

      {/* Treasuries */}
      <Select
        value={filters.treasury}
        onValueChange={(value) => handleFilterChange("treasury", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.treasury
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الخزينة"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
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
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.status
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الحالة"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          <SelectItem value="1" className="cursor-pointer py-2.5">
            محصل
          </SelectItem>
          <SelectItem value="0" className="cursor-pointer py-2.5">
            مسترد
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Payment Method */}
      <Select
        value={filters.payment_method}
        onValueChange={(value) => handleFilterChange("payment_method", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.payment_method
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="وسيل الدفع"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          <SelectItem value="cash" className="cursor-pointer py-2.5">
            نقدى
          </SelectItem>
          <SelectItem value="visa" className="cursor-pointer py-2.5">
            بطاقة بنكية
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Start Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.start_at ? (
              format(new Date(filters.start_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">من</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-foreground w-full border-black/20 p-0 px-3 dark:border-white/40"
          align="start"
        >
          <Calendar
            mode="single"
            dir="rtl"
            selected={filters.start_at ? new Date(filters.start_at) : undefined}
            onSelect={(date) =>
              handleFilterChange(
                "start_at",
                date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : null
              )
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* End Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.end_at ? (
              format(new Date(filters.end_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">إلي</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-foreground w-full border-black/20 p-0 px-3 dark:border-white/40"
          align="start"
        >
          <Calendar
            mode="single"
            dir="rtl"
            selected={filters.end_at ? new Date(filters.end_at) : undefined}
            onSelect={(date) =>
              handleFilterChange(
                "end_at",
                date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : null
              )
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TransactionsFilters;
