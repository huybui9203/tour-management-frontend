const Pagination = ({ currPage, handleCurrPage, total }) => {
    return (
        <div className="flex space-x-1">
            <button
                className="rounded-full border  border-red-400 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                onClick={() => {
                    if (currPage > 1) {
                        handleCurrPage((prev) => prev - 1);
                    }
                }}
            >
                Prev
            </button>

            <button
                className="min-w-9 rounded-full border  border-red-400 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                disabled={currPage === total}
                onClick={() => {
                    if (currPage < total) {
                        handleCurrPage((prev) => prev + 1);
                    }
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
