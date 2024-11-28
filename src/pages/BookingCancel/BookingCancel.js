import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import formatPrice from "../../utils/formatPrice";

const BookingCancel = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate()
  const params = useParams();
  const location = useLocation();
  const responseRefund = location?.state?.data
  console.log(location);
  if(!location?.state?.data) {
    return <></>
  }
  return (
    <Modal open={isOpen} onClose={() => {
      setOpen(false)
      navigate(`${'/history'}`, {replace: true})
    }}>
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
      
      <div className="flex justify-center"><img src='https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg' className='border-none'/></div>
        <h1 className="font-bold text-2xl text-gray-800 mb-4">
          Hủy đơn đặt thành công #{params.id}
        </h1>
        <p className="text-base text-gray-600">
            Trạng thái:
          <span className="ml-1 font-semibold text-gray-900">
            {responseRefund?.vnp_Message}
          </span>
        </p>
        <p className="text-base text-gray-600">
            Số tiền:
          <span className="ml-1 font-semibold text-gray-900">
            {formatPrice(responseRefund?.vnp_Amount / 100)+ ' VNĐ'}
          </span>
        </p>
        <p className="text-base text-gray-600">
            Nội dung:
          <span className="ml-1 font-semibold text-gray-900">
            {responseRefund?.vnp_OrderInfo}
          </span>
        </p>
        <p className="text-base text-gray-600">
            Ngày thanh toán:
          <span className="ml-1 font-semibold text-gray-900">
            {responseRefund?.vnp_PayDate?.substring(0, 4)}-
            {responseRefund?.vnp_PayDate?.substring(4, 6)}-
            {responseRefund?.vnp_PayDate?.substring(6, 8) + ' '}
            {responseRefund?.vnp_PayDate?.substring(8, 10)}:
            {responseRefund?.vnp_PayDate?.substring(10, 12)}:
            {responseRefund?.vnp_PayDate?.substring(12, 14)}
            
          </span>
        </p>
        {/* <p className="text-base text-gray-600">
            Mã giao dịch:
          <span className="ml-1 font-semibold text-gray-900">
            {responseRefund?.vnp_TransactionNo}
          </span>
        </p> */}
        <p className="text-base text-gray-600">
            Ngân hàng:
          <span className="ml-1 font-semibold text-gray-900">
            {responseRefund?.vnp_BankCode}
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default BookingCancel;
