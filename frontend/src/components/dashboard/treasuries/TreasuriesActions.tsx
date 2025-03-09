import { PERMISSIONS } from "@/enums/permissions";
import SearchInput from "../SearchInput";
import useHasPermission from "@/hooks/useHasPermission";
import AddTreasuryButton from "./AddTreasuryModalButton";
import TransferBetweenTreasuriesButton from "./TransfareBetweenTreasuriesModalButton";
import { memo } from "react";
interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const TreasuriesActions = ({ searchKeyword, setSearchKeyword }: IProps) => {
  const canAddTreasury = useHasPermission(PERMISSIONS.ADD_TREASURY);

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {canAddTreasury && <AddTreasuryButton />}
        {canAddTreasury && <TransferBetweenTreasuriesButton />}
      </div>
      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        placeholder="ابحث عن خزينة"
      />
    </div>
  );
};

export default memo(TreasuriesActions);
