import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { IPaginationLink } from "@/interfaces";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface Props {
  links: IPaginationLink[];
}

const DataTablePagination = ({ links }: Props) => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (url: string | null) => {
    if (url) {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get("page");
      if (page) {
        setSearchParams({ page });
      }
    }
  };

  const renderPaginationItem = (link: IPaginationLink, index: number) => {
    // Handle Previous button
    if (link.label.includes("السابق")) {
      return (
        <PaginationItem key={index}>
          <Button
            onClick={() => handlePageChange(link.url)}
            className={`gap-1 ${
              !link.url ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>السابق</span>
          </Button>
        </PaginationItem>
      );
    }

    // Handle Next button
    if (link.label.includes("التالي")) {
      return (
        <PaginationItem key={index}>
          <Button
            onClick={() => handlePageChange(link.url)}
            className={`gap-1 ${
              !link.url ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span>التالي</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      );
    }

    // Handle ellipsis
    if (link.label === "...") {
      return (
        <PaginationItem key={index}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Handle numeric pages
    const pageNumber = parseInt(link.label);
    if (!isNaN(pageNumber)) {
      return (
        <PaginationItem key={index}>
          <PaginationLink
            onClick={() => handlePageChange(link.url)}
            isActive={link.active}
            className={
              !link.url
                ? "cursor-not-allowed text-dark dark:text-white bg-muted/20 hover:bg-muted dark:bg-dark/40"
                : link.active
                ? "text-secondary cursor-pointer bg-primary hover:bg-primary/90 border-muted opacity-100 hover:text-priamry"
                : "text-primary cursor-pointer border-muted bg-muted/20 hover:bg-muted/80 opacity-80"
            }
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return null;
  };

  return (
    <Pagination dir="ltr" className="mt-4">
      <PaginationContent>
        {links.map((link, index) => renderPaginationItem(link, index))}
      </PaginationContent>
    </Pagination>
  );
};

export default DataTablePagination;
