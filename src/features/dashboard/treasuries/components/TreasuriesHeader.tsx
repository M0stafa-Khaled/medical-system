import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateTreasury } from "./CreateTreasury";
import SelectFilter from "@/shared/components/ui/select-filter";
import { Button } from "@/shared/components/ui/button";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { useGetAllTreasuries } from "../queriesAndMutations";

export const TreasuriesHeader = () => {
  const canCreateTreasury = useHasPermission(PERMISSIONS.ADD_TREASURY);
  const canTransferTreasury = useHasPermission(
    PERMISSIONS.TRANSFER_BETWEEN_TREASURIES
  );
  const { data: treasuries } = useGetAllTreasuries({});

  const [searchParams, setSearchParams] = useSearchParams();

  const treasury = searchParams.get("q") || "";

  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {canCreateTreasury && <CreateTreasury />}
        {canTransferTreasury && (
          <Button asChild className="h-auto gap-2 py-3 md:w-40">
            <Link to="/dashboard/treasuries/transfers-between">
              تحويل بين الخزائن
              <FaMoneyBillTransfer size={20} />
            </Link>
          </Button>
        )}
      </div>
      <SelectFilter
        className="max-w-sm"
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
  );
};
