import { useState, useRef, useEffect, useContext } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { PiMapPinAreaLight } from "react-icons/pi";
import { GiAlarmClock } from "react-icons/gi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/formatDate";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";
import axios from "axios";

const TourItemH = ({ tour, vertical }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const carouselInnerRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLike(tour?.liked_users?.some(item=>item?.id == user?.id))
  }, [tour?.liked_users])
 
  console.log(user);
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
    setScrollPosition((prevPosition) =>
      Math.max(prevPosition - 150, -maxScroll)
    ); // Không cho dịch qua phải hơn giới hạn
  };
const likeTour = async () => {
  
  try {
    if(!user) {
      return
    }
    const data = await axios.post(
      process.env.REACT_APP_URL +
        "/tour/" +
        tour.id +
        "/like",
      {},
      { withCredentials: true }
    );
    setLike(true)
    console.log(data);
  } catch (error) {
    alert("Đã xảy ra lỗi");
  }
}

const unLikeTour = async () => {
  try {
    if(!user) {
      return
    }
    const data = await axios.delete(
      process.env.REACT_APP_URL +
        "/tour/" +
        tour.id +
        "/unLike",
      { withCredentials: true }
    );
    setLike(false)
    console.log(data);
  } catch (error) {
    alert("Đã xảy ra lỗi");
  }
}

  return (
    <div className="flex">
      <div className={`flex py-4 ${vertical ? 'h-auto w-full' : 'lg:h-[300px] h-full'}`}>
        {/* <div className="md:w-1/3"> left</div> */}
        <div className={`md:flex border border-gray-200 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex-1 relative ${vertical ? 'flex-col' : ''}`}>
          <button
            className={
              like
                ? "absolute top-1 left-1 p-1 text-xl text-red-500 border rounded-full border-white"
                : "absolute top-1 left-1 p-1 text-xl text-gray-600 opacity-60 border rounded-full border-white"
            }
            onClick={like ? unLikeTour : likeTour}
          >
            <FaHeart />
          </button>
          <div className="min-w-80 h-44 md:h-full min-h-[268px] flex items-center">
            <img
              src={
                tour.images?.length > 0
                  ? tour.images[0].img_url.split(" ")[0]
                  : undefined
              }
              className="w-full h-full"
              alt="Tour"
            />
          </div>
          <div className="w-full p-3 md:h-full">
            <div>
              <h3 className={`line-clamp-2 lg:text-2xl md:text-xl text-base font-bold ${vertical ? 'lg:text-base' : ''}`}>
                <a href="#">{tour.name}</a>
              </h3>
            </div>

            <div className="md:flex">
              <div className={`md:w-full flex items-center mt-1 md:mt-2 ${vertical? 'md:w-fit mr-4':''}`}>
                <IoTicketOutline className="text-xl mr-1 w-5" />
                <span className="lg:text-base md:text-sm">Mã:</span>
                <span className="ml-1 font-bold lg:text-base md:text-sm ">
                  {tour.id}
                </span>
              </div>
              <div className="md:w-full flex items-center mt-1 md:mt-2">
                <PiMapPinAreaLight className="text-xl mr-1" />
                <span className={`lg:text-base md:text-sm shrink-0`}>Khởi hành:</span>
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
                  {tour.total_day}
                </span>
              </div>
              <div className="md:w-1/2 flex items-center mt-1 md:mt-2">
                <PiAirplaneTakeoffLight className="text-xl mr-1" />
                <span className="lg:text-base md:text-sm shrink-0">Phương tiện:</span>
                <span className="ml-1 lg:text-base md:text-sm shrink-0">
                  {tour?.veh?.ele_name}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex md:flex items-center mt-2 md:mt-1">
                <LuCalendarDays className="text-xl mr-1" />
                <span className="lg:text-base md:text-sm md:block shrink-0">
                  Ngày khởi hành:{" "}
                </span>
              </div>
              <div className="relative w-5/6 ml-auto md:w-2/3 md:mx-auto mt-2">
                <div className="relative overflow-hidden w-3/4 mx-auto">
                  <div
                    ref={carouselInnerRef}
                    id="carousel-inner"
                    className="flex transition-transform duration-300 mx-auto"
                    style={{ transform: `translateX(${scrollPosition}px)` }}
                  >
                    {tour?.date?.map((item) => (
                      <button
                        key={item.id}
                        className="bg-white text-red-500 hover:text-white px-2 m-1 min-w-28  lg:text-base md:text-sm rounded border border-red-500 hover:bg-red-500"
                      >
                        {formatDate(item?.start_date)}
                      </button>
                    ))}
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
