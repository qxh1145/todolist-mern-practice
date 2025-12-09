import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TaskListPagination = ({
  handleNextPage,
  handlePrevPage,
  handlePageChanged,
  page,
  totalPage,
}) => {
  const generatePages = () => {
    let pages = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
      return pages;
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPage];
    }

    if (page >= totalPage - 2) {
      return [1, "...", totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPage];
  };

  const pageToShow = generatePages();
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrevPage}
            />
          </PaginationItem>

          {pageToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p == "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => 
                    handlePageChanged(p)
                  }
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPage ? undefined : handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
