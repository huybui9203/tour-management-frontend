import { useEffect, useRef } from "react";
import styles from './Filter.module.css'
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRatingOption = ({ id, starsFilled, totalStars = 5, handleFilterQuery }) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                name="rating"
                className="form-checkbox text-blue-600 h-4 w-4"
                id={id}
                onClick={(prev) => {
                    handleFilterQuery((prev) => ({
                        ...prev,
                        rating: starsFilled,
                    }));
                }}
            />
            <label className="ml-2" htmlFor={id}>
                <p className="flex items-center">
                    <span className="text-yellow-400 flex">
                        {/* Hiển thị số ngôi sao đầy */}
                        {Array(starsFilled)
                            .fill()
                            .map((_, index) => (
                                <FaStar key={index} className="text-red-500 mx-1" />
                            ))}
                        {/* Hiển thị số ngôi sao rỗng */}
                        {Array(totalStars - starsFilled)
                            .fill()
                            .map((_, index) => (
                                <FaRegStar key={index} className="text-red-500 mx-1" />
                            ))}
                    </span>
                </p>
            </label>
        </div>
    );
};

const Filter = ({ filterQuery, handleFilterQuery, handleFilter, list, handleList }) => {
    return (
        <div className="container mx-auto ">
            <div className="flex flex-wrap">
                <div className="w-full w-screen-full py-4 animate-fadeIn">
                    <div className="bg-white rounded p-6 animate-fadeIn border" style={{ backgroundColor: "#f8faff" }}>
                        <h3 className="text-xl font-semibold mb-4">BỘ LỌC TÌM KIẾM</h3>
                        <form action="#">
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label className="">Chọn điểm khởi hành:</label>
                                    <input
                                        type="text"
                                        className="form-control w-full px-4 py-2 border border-gray-300 rounded outline-none text-black"
                                        placeholder="Điểm khởi hành"
                                        value={filterQuery.destination}
                                        id="destination"
                                        onChange={(e) =>
                                            handleFilterQuery((prev) => ({
                                                ...prev,
                                                [e.target.id]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="">Chọn điểm đến:</label>
                                    <div className="relative">
                                        <select
                                            value={filterQuery.place}
                                            id="place"
                                            onChange={(e) =>
                                                handleFilterQuery((prev) => ({
                                                    ...prev,
                                                    [e.target.id]: e.target.value,
                                                }))
                                            }
                                            className="form-control border border-gray-300 rounded block outline-none w-full p-2.5 text-black"
                                        >
                                            <option value="">Chọn điểm đến</option>
                                            <option value="đà nẵng">Đà Nẵng</option>
                                            <option value="hà nội">Hà Nội</option>
                                            <option value="hồ chí minh">Hồ Chí Minh</option>
                                            <option value="nha trang">Nha Trang</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="">Ngày bắt đầu:</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                                        placeholder="Ngày khởi hành"
                                        data-toggle="datepicker"
                                        value={filterQuery.start_date || ""}
                                        onChange={(e) =>
                                            handleFilterQuery((prev) => ({
                                                ...prev,
                                                [e.target.id]:
                                                    e.target.value &&
                                                    new Date(e.target.value).toISOString().split("T")[0],
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="">Ngày kết thúc:</label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                                        placeholder="Ngày đến"
                                        data-toggle="datepicker"
                                        value={filterQuery.end_date || ""}
                                        onChange={(e) =>
                                            handleFilterQuery((prev) => ({
                                                ...prev,
                                                [e.target.id]:
                                                    e.target.value &&
                                                    new Date(e.target.value).toISOString().split("T")[0],
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group range-slider">
                                    <label className="">Chọn giá tiền:</label>
                                    <h1 className="flex items-center justify-between">
                                        <span>{filterQuery.min}</span>
                                        <span className="flex-1 text-center">-</span>
                                        <span>{filterQuery.max}</span>
                                    </h1>
                                    <div className="mb-10 mt-4 relative">
                                        <input
                                            id="min"
                                            type="range"
                                            value={parseInt(filterQuery.min)}
                                            onChange={(e) => {
                                                handleFilterQuery((prev) => ({
                                                    ...prev,
                                                    [e.target.id]: e.target.value,
                                                }));
                                            }}
                                            min="1000000"
                                            max="20000000"
                                            step="1000000"
                                            className="w-full h-2 bg-blue-300 rounded outline-none absolute ml-0 top-0 left-0"
                                        />
                                        <input
                                            id="max"
                                            type="range"
                                            value={parseInt(filterQuery.max)}
                                            onChange={(e) => {
                                                handleFilterQuery((prev) => ({
                                                    ...prev,
                                                    [e.target.id]: e.target.value,
                                                }));
                                            }}
                                            min="1000000"
                                            max="20000000"
                                            step="1000000"
                                            className="w-full h-2 bg-blue-300 rounded outline-none absolute top-0 left-0"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Tìm kiếm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const filterList = handleFilter();
                                            handleList(filterList);
                                        }}
                                        className="w-full bg-red-500 border text-white py-3 px-5 rounded hover:bg-white hover:text-red-500 border-red-500 outline-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div
                        className="sidebar-wrap bg-gray-100 p-6 animate__animated animate__fadeIn border hidden lg:block"
                        style={{ backgroundColor: "#f8faff" }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Đánh giá</h3>
                        <form method="post" className="space-y-1 md:space-y-2 form-group">
                            <StarRatingOption id="star1" starsFilled={5} handleFilterQuery={handleFilterQuery} />
                            <StarRatingOption id="star2" starsFilled={4} handleFilterQuery={handleFilterQuery} />
                            <StarRatingOption id="star3" starsFilled={3} handleFilterQuery={handleFilterQuery} />
                            <StarRatingOption id="star4" starsFilled={2} handleFilterQuery={handleFilterQuery} />
                            <StarRatingOption id="star5" starsFilled={1} handleFilterQuery={handleFilterQuery} />
                        </form>
                    </div>
                </div>

                <div className="lg:w-3/4 sm:w-full w-full w-screen-full"></div>
            </div>
        </div>
    );
};

export default Filter;
