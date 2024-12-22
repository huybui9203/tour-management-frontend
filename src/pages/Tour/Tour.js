import { useState, useEffect } from "react";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Filter/Sort";
import axios from "axios";

const Tour = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [list, setList] = useState([]);
    const [backupList, setBackupList] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [sortQuery, setSortQuery] = useState("all");
    const [filterQuery, setFilterQuery] = useState({
        destination: "",
        place: "",
        start_date: "",
        end_date: "",
        min: 1000000,
        max: 20000000,
        rating: 0,
    });

    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/tour/get-list`);
        setList(res.data.list);
        setBackupList(res.data.list);
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleOverlayClick = () => {
        setShowFilter(false);
    };

    useEffect(() => {
        if (list && list.length > 0) {
            let tempList;
            switch (sortQuery) {
                case "asc_price":
                    tempList = [...list].sort((tour1, tour2) => tour1.price - tour2.price);
                    break;
                case "desc_price":
                    tempList = [...list].sort((tour1, tour2) => tour2.price - tour1.price);
                    break;
                default:
                    tempList = backupList;
                    break;
            }
            setList(tempList);
        }
    }, [sortQuery]);

    const handleFilter = () => {
        let tempList = [...backupList];
        if (
            filterQuery.destination === "" &&
            filterQuery.place === "" &&
            filterQuery.end_date === "" &&
            filterQuery.start_date === "" &&
            filterQuery.min === 1000000 &&
            filterQuery.max === 5000000
        ) {
            alert(1);
            tempList = [...backupList];
        }
        if (filterQuery.destination !== "") {
            tempList = tempList.filter((item) =>
                item.departure_point.toLowerCase().includes(filterQuery.destination.toLowerCase())
            );
        }
        if (filterQuery.place !== "") {
            tempList = tempList.filter((item) =>
                item.destination.toLowerCase().includes(filterQuery.place.toLowerCase())
            );
        }
        // if (filterQuery.end_date !== "") {
        //     tempList = tempList.filter((item) => {
        //         const result = item.date.find(
        //             (tour) => new Date(tour.start_date).getTime() <= new Date(filterQuery.end_date).getTime()
        //         );
        //         return result ? true : false;
        //     });
        // }
        if (filterQuery.start_date !== "") {
            tempList = tempList.filter((item) => {
                console.log('>>',item?.date)
                const result = item?.date?.find(
                    (tour) => {
                       
                       return new Date(tour.start_date).toLocaleDateString() == new Date(filterQuery.start_date).toLocaleDateString()
                    }
                );
                return result ? true : false;
            });
        }
        if (filterQuery.rating !== 0) {
            tempList = tempList.filter((item) => item.rating >= filterQuery.rating);
        }

        tempList = tempList.filter((item) => item.price <= filterQuery.max && item.price >= filterQuery.min);

        return tempList;
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
        fetchData();
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="sm:container relative">
            
            <Sort sortQuery={sortQuery} handleSortQuery={setSortQuery} />

            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={handleOverlayClick}></div>
            )}

            <div className="lg:flex gap-4">
               
                <div
                    className={`lg:w-1/4 lg:static lg:z-0 lg:top-auto lg:left-auto lg:transform-none z-30 w-full px-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                        showFilter ? "block" : "hidden"
                    } lg:block`}
                >
                    <Filter
                        backupList={backupList}
                        list={list}
                        handleList={setList}
                        filterQuery={filterQuery}
                        handleFilterQuery={setFilterQuery}
                        handleFilter={handleFilter}
                    />
                </div>
                <div className="lg:w-3/4">
                    <div>
                        {list && list.length > 0 ? (
                            list
                                .slice((currPage - 1) * 3, 3 * currPage)
                                .map((tour) => <TourItemH key={tour.id} tour={tour} />)
                        ) : (
                            <h1 className="text-center font-bold text-xl pt-4">Không tìm thấy tour nào</h1>
                        )}
                    </div>
                    <div className="flex justify-center py-4">
                        <Pagination currPage={currPage} handleCurrPage={setCurrPage} total={list.length} />
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
