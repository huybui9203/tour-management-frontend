import { useContext, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { HistoryContext } from "./History";
import DeleteDialog from "../../components/Dialog";
import axios from "axios";
import formatLocalDate from "../../utils/formatLocalDate";
import formatPrice from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUS_CODE } from "../../utils/constants";
import formatDate from "../../utils/formatDate";

const ButtonView = ({ order, label }) => {
  const [isShowView, setShowView] = useState(false);
  const [isOpenForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      if (!order?.payment?.bank_code) {
        const res = await axios.delete(
          process.env.REACT_APP_URL + "/order/" + order?.id + "/cancel",
          { withCredentials: true }
        );
        setShowView(false);
        reloadData(true);
        return;
      }
      const vnpayRefund = await axios.post(
        `${process.env.REACT_APP_URL}/order/vnpay/refund`,
        {
          transactionId: order?.payment?.transactionId,
          transactionDate: order?.payment?.transactionDate,
          amount: order?.total_price,
        },
        { withCredentials: true }
      );

      const res = await axios.delete(
        process.env.REACT_APP_URL + "/order/" + order?.id + "/cancel",
        { withCredentials: true }
      );

      setShowView(false);
      reloadData(true);
      console.log(vnpayRefund);
      navigate(`/history/booking/${order?.id}/cancel`, {
        state: { data: vnpayRefund.data },
      });
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
  };
  const reloadData = useContext(HistoryContext);
  return (
    <div>
      <button className="text-blue-500" onClick={() => setShowView(true)}>
        {label}
      </button>

      <Modal open={isShowView} onClose={() => setShowView(false)} size="m-xl">
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl max-h-screen overflow-auto">
          <h1 className="font-bold text-2xl text-gray-800 mb-4">
            Chi tiết đơn đặt #{order?.id}
          </h1>
          {order && (
            <div className="space-y-2">
              <p className="text-base text-gray-600">
                Ngày đặt:{" "}
                <span className="font-semibold text-gray-900">
                  {formatLocalDate(order?.order_date)?.slice(0, 10) +
                    " " +
                    formatLocalDate(order?.order_date)?.slice(11, 19)}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Khách hàng:{" "}
                <span className="font-semibold text-gray-900">
                  #{order?.customer?.id} - {order?.customer?.name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                SĐT:{" "}
                <span className="font-semibold text-gray-900">
                  {order?.customer?.phone_number}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Địa chỉ:{" "}
                <span className="font-semibold text-gray-900">
                  {order?.customer?.address}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Tour:{" "}
                <span className="font-semibold text-gray-900">
                  #{order?.tour_day?.tour?.id} - {order?.tour_day?.tour?.name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Thời gian:{" "}
                <span className="font-semibold text-gray-900">
                  {order?.tour_day?.tour?.total_day}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Ngày khởi hành:{" "}
                <span className="font-semibold text-gray-900">
                  {formatDate(order?.tour_day?.start_date)} -{" "}
                  {formatDate(order?.tour_day?.end_date)}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Điểm khởi hành:{" "}
                <span className="font-semibold text-gray-900">
                  {order?.tour_day?.tour?.departure_point} -{" "}
                  {order?.tour_day?.tour?.destination}
                </span>
              </p>

              <p className="text-base text-gray-600">
                Số người tham gia:
                <span className="ml-1 font-semibold text-gray-900">
                  {order?.number_of_people}
                </span>
              </p>

              <ul>
                {order?.participants?.length &&
                  order.participants.map((participant, index) => {
                    return (
                      <div key={participant.id}>
                        <p className="text-base">
                          {index + 1}. {participant.name} -{" "}
                          {formatPrice(participant.price_for_one)} VNĐ
                        </p>
                      </div>
                    );
                  })}
              </ul>
              <p className="text-base text-gray-600">
                Số phòng đơn:
                <span className="ml-1 font-semibold text-gray-900">
                  {order?.rooms_count} x 1,500,000 VNĐ
                </span>
              </p>
              <p className="text-base text-gray-600">
                Ghi chú:
                <span className="ml-1 font-semibold text-gray-900">
                  {order?.note}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Tổng tiền:
                <span className="ml-1 font-semibold text-gray-900">
                  {formatPrice(order?.total_price)} VNĐ
                </span>
              </p>
              <p className="text-base text-gray-600">
                Trạng thái:
                <span className="ml-1 font-semibold text-gray-900">
                  {order?.status?.ele_name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Ngày thanh toán:
                {order?.pay_date ? (
                  <span className="ml-1 font-semibold text-gray-900">
                    {formatLocalDate(order?.pay_date)?.slice(0, 10) +
                      " " +
                      formatLocalDate(order?.pay_date)?.slice(11, 19)}
                  </span>
                ) : (
                  <span className="ml-2 text-orange-500 font-bold">
                    Chưa thanh toán
                  </span>
                )}
              </p>
              {order?.pay_date && (
                <p className="text-base text-gray-600">
                  Phương thức thanh toán:
                  <span className="ml-1 font-semibold text-gray-900">
                    {order?.payment?.payment_type || 'Tiền mặt' }
                  </span>
                </p>
              )}

              {order?.payment?.bank_code && (
                <p className="text-base text-gray-600">
                  Ngân hàng:
                  <span className="ml-1 font-semibold text-gray-900">
                    {order?.payment?.bank_code}
                  </span>
                </p>
              )}

              <div className="text-right">
                {" "}
                {order?.status_id !== ORDER_STATUS_CODE.CANCELED && (
                  <button
                    className="bg-red-500 p-2 px-4 text-white font-bold rounded-md mb-2"
                    onClick={() => {
                      setOpenForm(true);
                    }}
                  >
                    Hủy
                  </button>
                )}
              </div>
              <DeleteDialog
                msg={"Xác nhận hủy?"}
                open={isOpenForm}
                onClose={() => setOpenForm(false)}
                onConfirm={handleConfirmDelete}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ButtonView;
