import { useState, useRef, useEffect } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { PiMapPinAreaLight } from "react-icons/pi";
import { GiAlarmClock } from "react-icons/gi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

const TourItemH = ({ tour }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const carouselInnerRef = useRef(null);
    const navigate = useNavigate();

    // Thiết lập chiều rộng tối đa để dịch chuyển dựa trên tổng số item
    useEffect(() => {
        if (carouselInnerRef.current) {
            const totalWidth = carouselInnerRef.current.scrollWidth;
            const visibleWidth = carouselInnerRef.current.offsetWidth;
            setMaxScroll(totalWidth - visibleWidth); // Giới hạn khi đã hiển thị hết
        }
    }, []);

    const handlePrevClick = () => {
        setScrollPosition((prevPosition) => Math.min(prevPosition + 150, 0)); // Không cho dịch sang trái hơn vị trí ban đầu
    };

    const handleNextClick = () => {
        setScrollPosition((prevPosition) => Math.max(prevPosition - 150, -maxScroll)); // Không cho dịch qua phải hơn giới hạn
    };

    return (
        <div>
            <div className="flex py-4">
                {/* <div className="md:w-1/3"> left</div> */}
                <div className="md:flex border border-red-500 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="md:w-5/12 h-44 md:h-full flex items-center">
                        <img
                            src="https://vnpay.vn/s1/statics.vnpay.vn/2023/11/0d79ij9ruoja1698812184967.jpg"
                            className="w-full h-full  "
                            alt="Tour"
                        />
                    </div>
                    <div className="md:w-7/12 p-3">
                        <div>
                            <h3 className="line-clamp-2 lg:text-2xl md:text-xl text-base font-bold">
                                <a href="#">{tour.name}</a>
                            </h3>
                        </div>

                        <div className="md:flex">
                            <div className="md:w-1/2 flex items-center mt-1 md:mt-2">
                                <IoTicketOutline className="text-xl mr-1 w-5" />
                                <span className="lg:text-base md:text-sm">Mã:</span>
                                <span className="ml-1 font-bold lg:text-base md:text-sm ">NDSG063</span>
                            </div>
                            <div className="md:w-1/2 flex items-center mt-1 md:mt-2">
                                <PiMapPinAreaLight className="text-xl mr-1" />
                                <span className="lg:text-base md:text-sm">Khởi hành:</span>
                                <span className="ml-1 text-blue-700 font-bold lg:text-base md:text-sm  truncate">
                                    {tour.departure_point}
                                </span>
                            </div>
                        </div>
                        <div className="md:flex">
                            <div className="md:w-1/2 flex items-center mt-1 md:mt-2">
                                <GiAlarmClock className="text-xl mr-1" />
                                <span className="lg:text-base md:text-sm">Thời gian:</span>
                                <span className="ml-1 lg:text-base md:text-sm">
                                    {tour.total_day}N{tour.total_day - 1}D
                                </span>
                            </div>
                            <div className="md:w-1/2 flex items-center mt-1 md:mt-2">
                                <PiAirplaneTakeoffLight className="text-xl mr-1" />
                                <span className="lg:text-base md:text-sm">Phương tiện:</span>
                                <span className="ml-1 lg:text-base md:text-sm">{tour?.veh?.ele_name}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="md:flex items-center mt-2 md:mt-1">
                                <LuCalendarDays className="text-xl mr-1" />
                                <span className="lg:text-base md:text-sm hidden md:block">Ngày khởi hành: </span>
                            </div>
                            <div className="relative w-5/6 md:w-2/3 md:mx-auto mt-2">
                                <div className="relative overflow-hidden w-3/4 mx-auto">
                                    <div
                                        ref={carouselInnerRef}
                                        id="carousel-inner"
                                        className="flex transition-transform duration-300 mx-auto"
                                        style={{ transform: `translateX(${scrollPosition}px)` }}
                                    >
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            10/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            11/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            12/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            13/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            14/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            10/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            11/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            12/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            13/11
                                        </button>
                                        <button className="bg-white text-red-500 hover:text-white px-2 m-1  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500">
                                            14/11
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePrevClick}
                                    className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl bg-gray-100 hover:bg-gray-300 focus:bg-gray-300 rounded-full text-black w-10 h-10 flex items-center justify-center font-bold shadow-md transition-all duration-200 ease-in-out"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl bg-gray-100 hover:bg-gray-300 focus:bg-gray-300 rounded-full text-black w-10 h-10 flex items-center justify-center font-bold shadow-md transition-all duration-200 ease-in-out"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="my-3 md:my-6">
                                Giá từ:{" "}
                                <span className="ml-1  text-2xl lg:text-2xl md:text-xl font-bold text-red-600">
                                    {formatPrice(tour.price)} đ
                                </span>
                            </div>
                            <div className="my-3 md:my-6">
                                <button
                                    className="bg-red-500 text-white px-4 py-2  md:px-2 md:py-1  rounded hover:bg-red-600 lg:text-base md:text-sm"
                                    onClick={() => navigate(`/tour/${tour.id}`)}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourItemH;
