import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import cookieServices from "@/utils/cookieServices";
import { useGetAllTreasuries } from "@/lib/react-query/dashboard/treasuries";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم الخدمة"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.action}
        onChange={(e) => handleFilterChange("action", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم الموظف"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
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
          className={`border-black/20 dark:border-white/40 h-12!  ${
            filters.treasury
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الخزينة"
            className={`py-4 text-muted-foreground`}
          />
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white bg-foreground border-black/20 dark:border-white/40">
          <SelectItem value="all" className="py-2.5 cursor-pointer">
            الكل
          </SelectItem>
          {treasuries?.data.map((treasury) => (
            <SelectItem
              key={treasury.id}
              value={treasury.name}
              className="py-2.5 cursor-pointer"
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
          className={`border-black/20 dark:border-white/40 h-12!  ${
            filters.status
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الحالة"
            className={`py-4 text-muted-foreground`}
          />
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white bg-foreground border-black/20 dark:border-white/40">
          <SelectItem value="all" className="py-2.5 cursor-pointer">
            الكل
          </SelectItem>
          <SelectItem value="1" className="py-2.5 cursor-pointer">
            محصل
          </SelectItem>
          <SelectItem value="0" className="py-2.5 cursor-pointer">
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
          className={`border-black/20 dark:border-white/40 h-12!  ${
            filters.payment_method
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="وسيل الدفع"
            className={`py-4 text-muted-foreground`}
          />
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white bg-foreground border-black/20 dark:border-white/40">
          <SelectItem value="all" className="py-2.5 cursor-pointer">
            الكل
          </SelectItem>
          <SelectItem value="cash" className="py-2.5 cursor-pointer">
            نقدى
          </SelectItem>
          <SelectItem value="visa" className="py-2.5 cursor-pointer">
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
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
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
          className="w-full p-0 px-3 border-black/20 dark:border-white/40 bg-foreground"
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
                  ? new Date(date).toLocaleDateString("en-CA", {
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
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
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
          className="w-full p-0 px-3 border-black/20 dark:border-white/40 bg-foreground"
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
                  ? new Date(date).toLocaleDateString("en-CA", {
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
