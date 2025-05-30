import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface IProps {
    count: number;
    page: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

export function Paginate({ count, page, perPage, onPageChange }: IProps) {
    const totalPages = Math.ceil(count / perPage);

    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, -1, totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, -1, page - 1, page, page + 1, -1, totalPages);
            }
        }
        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) onPageChange(page - 1);
                        }}
                    />
                </PaginationItem>

                {getPages().map((pageItem, index) =>
                    pageItem === -1 ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={pageItem}>
                            <PaginationLink
                                href="#"
                                isActive={pageItem === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(pageItem);
                                }}
                            >
                                {pageItem}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) onPageChange(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
