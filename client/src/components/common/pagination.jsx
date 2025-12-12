import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function MyPagination({ page, totalPages, setPage }) {
  
  // Create only the visible pages (smart pagination)
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      // For small totals → show all
      console.log(totalPages)
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let p = start; p <= end; p++) pages.push(p);

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();
  console.log(pages)
  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        {totalPages>1 &&(
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
       )}
        {/* Page Numbers */}
        {pages.map((p, idx) => (
          <PaginationItem key={idx}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === p}
                onClick={() => setPage(p)}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        {totalPages>1 &&(
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && setPage(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
)}
      </PaginationContent>
    </Pagination>
  );
}
