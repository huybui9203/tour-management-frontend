import { IoTicketOutline } from 'react-icons/io5'; 
import { PiMapPinAreaLight } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const BookingPanel = () => {

    const navigate = useNavigate()
    return (
        <div className="md:flex ">
            {/* Phần bên trái */}
            <div className="md:w-2/3 border border-red-500 ">
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
                <div className='h-96'>1</div>
            </div>
            
            {/* Phần bên phải */}
            <div className="w-full max-w-[350px] mx-auto md:max-w-none md:w-1/3 flex flex-col sticky right-0 top-20 self-start ">


                <div className="animate-slideInUp shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">Giá:</h4>
                        <p className="sm:text-3xl text-xl  font-bold text-red-600">690,000 đ <span className="text-sm">/ Khách</span></p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center sm:text-base text-sm ">
                            <IoTicketOutline className='w-5 h-5 mr-2' />
                            <p>Mã tour: <span className="font-bold">NDCTH804-003-210924TAU-H</span></p>
                        </div>

                        <div className="flex items-center sm:text-base text-sm ">
                            <PiMapPinAreaLight className='w-5 h-5 mr-2' />
                            <p>Khởi hành: <span className="font-bold">Cần Thơ</span></p>
                        </div>

                        <div className="flex items-center sm:text-base text-sm ">
                            <LuCalendarDays className='w-5 h-5 mr-2' />
                            <p>Ngày khởi hành: <span className="font-bold">21-09-2024</span></p>
                        </div>

                        <div className="flex items-center sm:text-base text-sm ">
                            <FaRegClock className='w-5 h-5 mr-2' />
                            <p>Thời gian: <span className="font-bold">Trong ngày</span></p>
                        </div>

                        <div className="flex items-center sm:text-base text-sm ">
                            <FiUsers className='w-5 h-5 mr-2' />
                            <p>Số chỗ còn: <span className="font-bold">6 chỗ</span></p>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button className="bg-white border  sm:text-base text-sm border-red-500 text-red-500 sm:rounded-lg rounded-md px-2 py-1 sm:px-4 sm:py-2" type="button" aria-label="Ngày khác">Ngày khác</button>
                        <button onClick={() => navigate('/booking/example')} className="bg-red-500  sm:text-base text-sm text-white sm:rounded-lg rounded-md hover:bg-red-600  px-2 py-1 sm:px-4 sm:py-2" type="button" aria-label="Đặt tour">Đặt tour</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPanel;
