import { Card, CardContent } from "@/shared/components/ui/card";
import DeleteTreasuryButton from "./DeleteTreasury";
import UpdateTreasury from "./UpdateTreasury";
import useHasPermission from "@/shared/hooks/useHasPermission";
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
          "border-muted/40 hover:border-primary/40 cursor-pointer transition-all duration-300 hover:shadow-md dark:bg-black"
        }
      >
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                <Wallet className="text-primary h-5 w-5" />
                <h3 className="text-lg font-semibold">{treasury.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Power
                  size={20}
                  className={
                    treasury.status ? "text-green-500" : "text-red-500"
                  }
                />
                <span className="text-sm font-medium">
                  {treasury.status ? "نشط" : "غير نشط"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canUpdateCategory && <UpdateTreasury treasury={treasury} />}
              {canDeleteCategory && treasury.id !== 1 && (
                <DeleteTreasuryButton treasury={treasury} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CircleDollarSign size={20} className="shrink-0 text-green-500" />
              <span>الإجمالي: {treasury.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(TreasuryCard);
