import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const goPrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const goNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Genera un array de páginas a mostrar
    const getPages = () => {
        const pages = [];
        if (totalPages <= 5) {
        // Si hay pocas páginas, mostrar todas
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
        // Si hay muchas páginas, mostrar currentPage + 2
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) end = 5;
        if (currentPage >= totalPages - 2) start = totalPages - 4;

        for (let i = start; i <= end; i++) pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex gap-2 justify-center mt-5 items-center">
            <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="hover:text-accent disabled:text-gray-400 transition-colors duration-150"
            >
            <ArrowLeft size={18} />
        </button>

        {getPages().map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded ${
                page === currentPage ? "bg-accent text-white" : " hover:text-accent"
            }`}
            >
            {page}
            </button>
        ))}

        <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="hover:text-accent disabled:text-gray-400 transition-colors duration-150"
        >
            <ArrowRight size={18} />
        </button>
        </div>
    );
};

export default Pagination;
