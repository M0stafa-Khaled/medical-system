import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface IProps {
  currentPage: number;
  totalPages: number;
}

const DataTablePagination = ({ currentPage, totalPages }: IProps) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    // Always show first page
    pages.push(1);

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Near start
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <Pagination dir="ltr" className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`gap-1 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline-block">السابق</span>
          </Button>
        </PaginationItem>

        {renderPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-dark dark:text-white" />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? "text-secondary bg-primary hover:bg-primary/90 border-muted hover:text-secondary w-fit min-w-10 cursor-pointer px-1 opacity-100"
                    : "text-primary border-muted bg-muted/20 hover:bg-muted/80 w-fit min-w-10 cursor-pointer px-1 opacity-80"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`gap-1 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline-block">التالي</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataTablePagination;
