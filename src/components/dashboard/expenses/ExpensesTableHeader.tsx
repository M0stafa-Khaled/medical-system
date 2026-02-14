import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setSort: Dispatch<SetStateAction<boolean>>;
  sort: boolean;
}
const ExpensesTableHeader = ({ setSort, sort }: IProps) => {
  return (
    <TableHeader>
      <TableRow className="dark:bg-dark/70 dark:border-muted dark:hover:bg-dark/70 bg-white/80 hover:bg-white/80">
        <TableHead className="py-4 text-center text-nowrap">
          رقم الإيصال
        </TableHead>
        <TableHead className="py-4 text-center">التصنيف</TableHead>
        <TableHead className="py-4 text-center">المبلغ</TableHead>
        <TableHead className="py-4 text-center">الخزينة</TableHead>
        <TableHead className="py-4 text-center">الموظف</TableHead>
        <TableHead className="py-4 text-center text-nowrap">
          حالة المصروف
        </TableHead>
        <TableHead
          className="hover:bg-dark/10 cursor-pointer py-4 text-center text-nowrap transition-colors duration-200 dark:hover:bg-white/10"
          onClick={() => setSort(!sort)}
        >
          <div className="flex items-center justify-center gap-2">
            تاريخ الصرف
            <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead className="py-4 text-center">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ExpensesTableHeader;
