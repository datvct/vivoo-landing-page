import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`h-11 min-w-11 rounded-full px-4 text-sm font-medium transition ${currentPage === page
                            ? "bg-black text-white"
                            : "border border-black/15 bg-white text-black hover:border-black/30"
                        }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
