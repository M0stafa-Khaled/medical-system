import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateTreasury } from "./CreateTreasury";
import SelectFilter from "@/shared/components/ui/select-filter";
import { Button } from "@/shared/components/ui/button";
import { ArrowRightLeft, Vault } from "lucide-react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { useGetAllTreasuries } from "../queriesAndMutations";
import { motion } from "framer-motion";

export const TreasuriesHeader = () => {
  const canCreateTreasury = useHasPermission(PERMISSIONS.ADD_TREASURY);
  const canTransferTreasury = useHasPermission(
    PERMISSIONS.TRANSFER_BETWEEN_TREASURIES
  );
  const { data: treasuries } = useGetAllTreasuries({});

  const [searchParams, setSearchParams] = useSearchParams();

  const treasury = searchParams.get("q") || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 space-y-4"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-yellow-600 to-amber-600 shadow-lg shadow-yellow-500/30 dark:shadow-yellow-500/20">
            <Vault className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              إدارة الخزائن
            </h1>
            <p className="truncate text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              متابعة ومراقبة الخزائن المالية
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {canCreateTreasury && <CreateTreasury />}
          {canTransferTreasury && (
            <Button asChild size="default" variant="outline" className="gap-2">
              <Link to="/dashboard/treasuries/transfers-between">
                <ArrowRightLeft className="h-4 w-4" />
                <span className="hidden sm:inline">تحويل بين الخزائن</span>
                <span className="sm:hidden">تحويل</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <SelectFilter
          className="max-w-md"
          placeholder="الخزنة"
          value={treasury}
          filterKey="q"
          handleFilterChange={(key, value) => {
            const params = new URLSearchParams(searchParams);
            if (value === "all") params.delete(key);
            else if (value) params.set(key, value);
            else params.delete(key);
            setSearchParams(params);
          }}
          options={[
            { value: "all", label: "الكل" },
            ...(treasuries?.data.length
              ? treasuries.data.map((t) => ({
                  value: t.name.trim(),
                  label: t.name,
                }))
              : []),
          ]}
        />
      </div>
    </motion.div>
  );
};
