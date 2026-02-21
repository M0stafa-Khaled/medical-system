import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateTreasury } from "./CreateTreasury";
import { TransferBetweenTreasuries } from "./TransferBetweenTreasuries";
import SearchInput from "@/shared/components/ui/SearchInput";

export const TreasuriesHeader = () => {
  const canCreateTreasury = useHasPermission(PERMISSIONS.ADD_TREASURY);
  const canTransferTreasury = useHasPermission(
    PERMISSIONS.TRANSFER_BETWEEN_TREASURIES
  );

  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {canCreateTreasury && <CreateTreasury />}
        {canTransferTreasury && <TransferBetweenTreasuries />}
      </div>
      <SearchInput placeholder="ابحث عن خزينة" />
    </div>
  );
};
