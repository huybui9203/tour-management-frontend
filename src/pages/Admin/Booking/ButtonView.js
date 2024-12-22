import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import formatPrice from "../../../utils/formatPrice";

const ButtonView = ({ orderId, label }) => {
  const [isShowView, setShowView] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleView = async () => {
    setShowView(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/admin/bookings/" + orderId,
        { withCredentials: true }
      );
      if (res?.data) {
        setBookingData(res.data);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
  };

  return (
    <div>
      <button
        className="text-blue-500 font-bold decoration-solid"
        onClick={handleView}
      >
        {"#" + label}
      </button>
      {/* <Modal open={isShowView} onClose={() => setShowView(false)}>
                <h1 className="font-bold text-2xl">Chi tiết đơn đặt #{orderId}</h1>
                {bookingData && (
                    <div>
                        <p>Khách hàng #{bookingData?.customer.id}: {bookingData?.customer.name}</p>
                        <p>Tour: {bookingData?.tour_day.tour.name}</p>
                        <p>Ngày đặt: {bookingData.order_date}</p>
                        <p>Số người tham gia: {bookingData.number_of_people}</p>
                        <p>Số người lớn: {bookingData.adults_count}</p>
                        <p>Số trẻ em: {bookingData.children_count}</p>
                        <p>Số phòng đơn: {bookingData.rooms_count}</p>
                        <p>Trạng thái: {bookingData?.status.ele_name}</p>
                        <p>Tổng tiền: {bookingData.total_price} VNĐ</p>
                        <p>Ngày thanh toán: {bookingData.order_date}</p>

                    </div>
                )}
            </Modal> */}
      <Modal open={isShowView} onClose={() => setShowView(false)} size="m-xl">
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
          <h1 className="font-bold text-2xl text-gray-800 mb-4">
            Chi tiết đơn đặt #{orderId}
          </h1>
          {bookingData && (
            <div className="space-y-2">
              <p className="text-base text-gray-600">
                Khách hàng:{" "}
                <span className="font-semibold text-gray-900">
                #{bookingData?.customer.id}: {bookingData?.customer.name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Số điện thoại:{" "}
                <span className="font-semibold text-gray-900">
                {bookingData?.customer?.phone_number}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Email:{" "}
                <span className="font-semibold text-gray-900">
                {bookingData?.customer?.email}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Địa chỉ:{" "}
                <span className="font-semibold text-gray-900">
                {bookingData?.customer?.address}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Đặt tour:{" "}
                <span className="font-semibold text-gray-900">
                {bookingData?.tour_day.tour.name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Ngày đặt:{" "}
                <span className="font-semibold text-gray-900">
                {bookingData?.order_date?.slice(0,10) + ' ' + bookingData?.order_date?.slice(11,19) }
                </span>
              </p>
              
              <p className="text-base text-gray-600">
              Số người tham gia:
                <span className="ml-1 font-semibold text-gray-900">
                {bookingData.number_of_people}
                </span>
              </p>

              

              
              <p className="text-base text-gray-600">
                Số phòng đơn:
                <span className="ml-1 font-semibold text-gray-900">
                {bookingData.rooms_count}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Ghi chú:
                <span className="ml-1 font-semibold text-gray-900">
                {bookingData.note || ''}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Trạng thái:
                <span className="ml-1 font-semibold text-gray-900">
                {bookingData?.status.ele_name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Tổng tiền:
                <span className="ml-1 font-semibold text-gray-900">
                {formatPrice(bookingData.total_price)} VNĐ
                </span>
              </p>
              <p className="text-base text-gray-600">
              Ngày thanh toán: 
              {bookingData?.pay_date ? <span className="ml-1 font-semibold text-gray-900">
                {bookingData?.pay_date?.slice(0,10) + ' ' + bookingData?.pay_date?.slice(11,19) }
                </span> : <span className="font-bold text-orange-500">Chưa thanh toán</span>}
                
              </p>

              
            </div>

          )}
        </div>
      </Modal>
    </div>
  );
};

export default ButtonView;
