import { useState } from "react";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Filter/Sort";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const Tour = () => { 
    const [showFilter, setShowFilter] = useState(true); 
 
    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleOverlayClick = () => {
        setShowFilter(false);
    };

    return (
        <div className="sm:container relative">
            <Sort /> 
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={handleOverlayClick}></div>
            )}
            <div className="md:flex gap-4">
                {showFilter && (
                   <div className="md:w-1/4 md:static md:z-0 md:top-auto md:left-auto md:transform-none z-30 w-3/4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <Filter />
                    </div>
                )}
                <div className="lg:w-3/4 md:w-full">
                    <div>
                        <TourItemH />
                        <TourItemH />
                        <TourItemH />
                        <TourItemH />
                        <TourItemH />
                    </div>
                    <div className="flex justify-center py-4">
                        <Pagination />
                    </div>
                </div>
            </div>

            <button
                onClick={toggleFilter}
                className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none md:hidden"
            >
                {showFilter ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
            </button>
        </div>
    );
};
 
export default Tour;
