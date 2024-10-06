
const Pagination = () => {

    return (
        <div className="flex space-x-1">
            <button className="rounded-full border  border-red-400 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            Prev
        </button>
        <button className="min-w-9 rounded-full bg-red-200 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-200 focus:shadow-none active:bg-red-200 hover:bg-red-200 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            1
        </button>
        <button className="min-w-9 rounded-full border  border-red-400 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            2
        </button>
        <button className="min-w-9 rounded-full border  border-red-400 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            3
        </button>
        <button className="min-w-9 rounded-full border  border-red-400 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-200 hover:border-red-400 focus:text-white focus:bg-red-200 focus:border-red-400 active:border-red-400 active:text-white active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
        Next
        </button>
</div>

    );
} ;

export default Pagination