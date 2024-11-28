import { IoTicketOutline } from "react-icons/io5";
import { PiMapPinAreaLight } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/formatDate";

const BookingPanel = ({ tour, dayId }) => {
    const navigate = useNavigate();
    const date = tour.date?.find(item => item.id === dayId)
    const priceAfterPromo = Math.floor(tour?.price * (100 - date?.promo)/ 100)

    return (
        <div className="w-full lg:max-w-[350px] mx-auto md:max-w-none flex flex-col sticky right-0 top-20 self-start ">
            <div className="animate-slideInUp shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg">
                <div className="mb-4">
                    <h4 className="text-lg font-semibold">Giá:</h4>
                    <p className="sm:text-3xl text-xl  font-bold text-red-600">
                        {tour.price ? priceAfterPromo ? formatPrice(priceAfterPromo) : formatPrice(tour.price) : ''} đ <span className="text-sm">/ Khách</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center sm:text-base text-sm ">
                        <IoTicketOutline className="w-5 h-5 mr-2" />
                        <p>
                            Mã tour: <span className="font-bold">#{tour.id}</span>
                        </p>
                    </div>

                    <div className="flex items-center sm:text-base text-sm ">
                        <PiMapPinAreaLight className="w-5 h-5 mr-2" />
                        <p>
                            Khởi hành: <span className="font-bold">{tour.departure_point}</span>
                        </p>
                    </div>

                    {date && <div className="flex items-center sm:text-base text-sm ">
                        <LuCalendarDays className="w-5 h-5 mr-2" />
                        <p>
                            Ngày khởi hành: <span className="font-bold">{date && formatDate(date.start_date)}</span>
                        </p>
                    </div>}

                    <div className="flex items-center sm:text-base text-sm ">
                        <FaRegClock className="w-5 h-5 mr-2" />
                        <p>
                            Thời gian: <span className="font-bold">Trong ngày</span>
                        </p>
                    </div>

                    {date && <div className="flex items-center sm:text-base text-sm ">
                        <FiUsers className="w-5 h-5 mr-2" />
                        <p>
                            Số chỗ còn: <span className="font-bold">{date?.remain_seats} chỗ</span>
                        </p>
                    </div>}
                </div>

                <div className="flex space-x-4 mt-6">
                    {/* <button
                            className="bg-white border  sm:text-base text-sm border-red-500 text-red-500 sm:rounded-lg rounded-md px-2 py-1 sm:px-4 sm:py-2"
                            type="button"
                            aria-label="Ngày khác"
                        >
                            Ngày khác
                        </button> */}
                    {date ? <button
                        onClick={() => navigate(`/booking/${tour.id}?d=${date?.id}`)}
                        className="bg-red-500  sm:text-base text-sm text-white sm:rounded-lg rounded-md hover:bg-red-600  px-2 py-1 sm:px-4 sm:py-2"
                        type="button"
                        aria-label="Đặt tour"
                        disabled={!date}
                    >
                        Đặt tour
                    </button> : <p className="italic text-md">Vui lòng chọn ngày khởi hành</p>}
                </div>
            </div>
        </div>
    );
};

export default BookingPanel;
