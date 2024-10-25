import React from "react";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import formatPrice from "../../utils/formatPrice";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import ConfirmIcon from "../Booking/svg/ConfirmIcon";
import PayIcon from "../Booking/svg/PayIcon";
import FormIcon from "../Booking/svg/FormIcon";
import { FaRightLong } from "react-icons/fa6";

function VnPay() {
    /*
        Bank: NCB
        Code: 9704198526191432198
        User: NGUYEN VAN A
        DATE: 7/15
        OTP: 123456
     */

    const location = useLocation();
    const { id } = useParams();
    const formData = location.state;
    if (!formData) {
        return <h1>Error</h1>;
    }

    const total_price = [...formData.adults, ...formData.childs].reduce((acc, curr) => {
        return (acc += curr.price);
    }, 0);

    const handlePayment = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_URL}/order/pay-vnpay/${formData.id}`,
            {
                amount: total_price,
                idOrder: id,
                formData: formData,
                orderDescription: `Thanh toán đơn hàng mới`,
            },
            { withCredentials: true }
        );

        const { paymentUrl } = res.data;

        window.location.href = paymentUrl;
    };
    return (
        <div className="max-w-full flex flex-col justify-center gap-3 py-10 text-center">
            <h1 className="text-center font-bold text-xl uppercase ">Thanh toán đơn hàng</h1>
            <div className="flex justify-center items-center gap-8 xl:gap-14 my-10">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className={`bg-gray-400 rounded-full flex justify-center items-center w-12 h-12`}>
                        <FormIcon />
                    </div>
                    <h1 className="text-sm md:text-base xl:text-xl md:uppercase font-semibold text-blue-800">
                        Nhập thông tin
                    </h1>
                </div>
                <FaRightLong className="self-end text-gray-400 text-base md:text-xl" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className={`bg-blue-800 rounded-full flex justify-center items-center w-12 h-12`}>
                        <PayIcon />
                    </div>

                    <h1 className="text-sm md:text-base xl:text-xl md:uppercase font-semibold text-blue-800">
                        Thanh toán
                    </h1>
                </div>
                <FaRightLong className="self-end text-gray-400 text-base md:text-xl" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className={`bg-gray-400 rounded-full flex justify-center items-center w-12 h-12`}>
                        <ConfirmIcon />
                    </div>
                    <h1 className="text-sm md:text-base xl:text-xl md:uppercase font-semibold text-blue-800">
                        Xác nhận
                    </h1>
                </div>
            </div>

            <CountdownTimer initialMinutes={15} />
            <div className="p-4 rounded">
                <h1 className="text-xl font-semibold">
                    Tổng tiền cần thanh toán:{" "}
                    <span className="text-2xl font-bold text-red-700">{formatPrice(total_price)} VNĐ</span>
                </h1>

                <h1 className="text-sm my-2">Vui lòng chọn một phương thức để thanh toán</h1>
                <div className="grid grid-cols-1 gap-4 mt-4">
                    <div
                        className="rounded w-full p-2 cursor-pointer flex gap-4 items-center font-semibold border border-red-500 "
                        onClick={handlePayment}
                    >
                        <h1>Thanh toán bằng VNPAY</h1>
                        <img src="../logo-vnpay.webp" className="w-[100px] object-cover" />
                    </div>
                    <div className="rounded w-full px-2 py-3 cursor-pointer flex gap-4 items-center font-semibold border border-red-500 ">
                        <h1>Thanh toán bằng tiền mặt</h1>
                    </div>
                </div>
            </div>
            <p className="text-sm">Vui lòng thanh toán đơn hàng trong 10 phút để xác nhận đơn hàng!!!</p>
            <p className="text-sm">
                <span className="text-red-600 font-bold">Lưu ý:</span> Sau 10 phút chưa thanh toán hệ thống sẽ tự động
                hủy đơn hàng!!
            </p>
        </div>
    );
}

export default VnPay;
