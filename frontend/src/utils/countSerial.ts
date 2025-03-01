import { IPaginationMeta } from "@/interfaces";

const countSerial = ({
  meta,
  index,
}: {
  meta: IPaginationMeta;
  index: number;
}): number => {
  const { from, per_page } = meta!;
  const currentPage = Math.ceil(from / per_page);
  return (currentPage - 1) * per_page + (index + 1);
};

export default countSerial;
