import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../../ui/SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import CreateTreasury from "./CreateTreasury";
import TransferBetweenTreasuriesButton from "./TransferBetweenTreasuries";
import { memo } from "react";

const TreasuriesHeader = () => {
  const canCreateTreasury = useHasPermission(PERMISSIONS.ADD_TREASURY);
  const canTransferTreasury = useHasPermission(
    PERMISSIONS.TRANSFER_BETWEEN_TREASURIES
  );

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {canCreateTreasury && <CreateTreasury />}
        {canTransferTreasury && <TransferBetweenTreasuriesButton />}
      </div>
      <SearchInput placeholder="ابحث عن خزينة" />
    </div>
  );
};

export default memo(TreasuriesHeader);
