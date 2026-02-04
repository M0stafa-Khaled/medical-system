import { IPaginationMeta } from "@/interfaces";

/**
 * Calculates the serial number for an item in a paginated list
 * 
 * @param {Object} params - The parameters object
 * @param {IPaginationMeta} params.meta - Pagination metadata containing 'from' and 'per_page' values
 * @param {number} params.index - Zero-based index of the item in the current page
 * @returns {number} The calculated serial number of the item across all pages
 */
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
