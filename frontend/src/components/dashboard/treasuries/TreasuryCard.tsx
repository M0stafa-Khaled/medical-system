import { Card, CardContent } from "@/components/ui/card";
import DeleteTreasuryButton from "./DeleteTreasury";
import UpdateTreasury from "./UpdateTreasury";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { ITreasury } from "@/interfaces/dashboard/treasury";
import { motion } from "framer-motion";
import { CircleDollarSign, Power, Wallet } from "lucide-react";
import { memo } from "react";

interface IProps {
  treasury: ITreasury;
}

const TreasuryCard = ({ treasury }: IProps) => {
  const canUpdateCategory = useHasPermission(PERMISSIONS.UPDATE_TREASURY);
  const canDeleteCategory = useHasPermission(PERMISSIONS.DELETE_TREASURY);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={
          "transition-all duration-300 hover:shadow-md cursor-pointer border-muted/40 hover:border-primary/40 dark:bg-black"
        }
      >
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">{treasury.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Power
                  size={20}
                  className={
                    treasury.status ? "text-green-500" : "text-red-500"
                  }
                />
                <span className="font-medium text-sm">
                  {treasury.status ? "نشط" : "غير نشط"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canUpdateCategory && <UpdateTreasury treasury={treasury} />}
              {canDeleteCategory && (
                <DeleteTreasuryButton treasury={treasury} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CircleDollarSign
                size={20}
                className="text-green-500 flex-shrink-0"
              />
              <span>إجمالي المصروفات: {treasury.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(TreasuryCard);
