import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
}

const DataTablePagination = ({ currentPage, totalPages }: IProps) => {
  console.log(currentPage, totalPages);
  const [maxVisiblePages, setMaxVisiblePages] = useState(2);
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 540) {
        setMaxVisiblePages(2);
      } else if (width < 786) {
        setMaxVisiblePages(4);
      } else if (width < 1024) {
        setMaxVisiblePages(5);
      } else {
        setMaxVisiblePages(7);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingsCount = 1;

    pages.push(1);

    if (totalPages <= maxVisiblePages) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2);
      const rightSiblingIndex = Math.min(
        currentPage + siblingsCount,
        totalPages - 1
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        for (let i = 2; i < maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pages.push("...");
        for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pages.push("...");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="max-w-full">
      {" "}
      {/* Allow horizontal scrolling */}
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
                      ? "text-secondary cursor-pointer bg-primary hover:bg-primary/90 border-muted opacity-100 hover:text-priamry"
                      : "text-primary cursor-pointer border-muted bg-muted/20 hover:bg-muted/80 opacity-80"
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
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline-block">التالي</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DataTablePagination;
