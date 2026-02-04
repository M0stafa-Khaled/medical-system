import { Card, CardContent } from "@/components/ui/card";
import { numberToPrice } from "@/utils/numberToPrice";
import { motion } from "framer-motion";

interface IProps {
  total_amount_due: number;
  total_amount_paid: number;
  refund_amount: number;
  total_balance: string;
}
const PatientBalancesHeader = ({
  refund_amount,
  total_amount_due,
  total_amount_paid,
  total_balance,
}: IProps) => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-semibold text-dark dark:text-white text-2xl">
          مدفوعاتى :
        </h1>
        <Card className="mt-6 transition-all duration-300 hover:shadow-md cursor-pointer border-muted/40 hover:border-primary/40 dark:bg-black/60">
          <CardContent className="py-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div className="text-dark dark:text-white flex items-center gap-2 font-semibold text-lg lg:text-xl">
              <h4>إجمالي المبلغ الفعلى:</h4>
              <p>{numberToPrice(total_amount_due)}</p>
            </div>
            <div className="text-dark dark:text-white flex items-center gap-2 font-semibold sm:text-lg lg:text-xl">
              <h4>إجمالي المبالغ المدفوعة:</h4>
              <p>{numberToPrice(total_amount_paid)}</p>
            </div>
            <div className="text-dark dark:text-white flex items-center gap-2 font-semibold sm:text-lg lg:text-xl">
              <h4>إجمالي المبالغ المستحقة:</h4>
              <p>{numberToPrice(total_balance)}</p>
            </div>
            <div className="text-dark dark:text-white flex items-center gap-2 font-semibold sm:text-lg lg:text-xl">
              <h4>إجمالي المبالغ المستردة:</h4>
              <p>{numberToPrice(refund_amount)}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default PatientBalancesHeader;
