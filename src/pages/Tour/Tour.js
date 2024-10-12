import { useState, useEffect } from "react";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Filter/Sort";
import { FaChevronDown } from "react-icons/fa";

const Tour = () => {  
    const [showFilter, setShowFilter] = useState(false);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleOverlayClick = () => {
        setShowFilter(false);
    };

    useEffect(() => {
        // Kiểm tra kích thước màn hình khi tải trang
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setShowFilter(true); 
            } else {
                setShowFilter(false); 
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="sm:container relative">
            <Sort />
            
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={handleOverlayClick}></div>
            )}

            <div className="lg:flex gap-4">
                <div className={`lg:w-1/4 lg:static lg:z-0 lg:top-auto lg:left-auto lg:transform-none z-30 w-full px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${showFilter ? 'block' : 'hidden'} lg:block`}>
                    <Filter />
                </div>
                <div className="lg:w-3/4">
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
                className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none lg:hidden"
            >
                {showFilter ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
            </button>
        </div>
    );
};
 
export default Tour;
