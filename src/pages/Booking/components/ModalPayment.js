import React, { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer";
import VnPayPayment from "../../../components/VnPayPayment/VnPayPayment";
import formatPrice from "../../../utils/formatPrice";
function ModalPayment({ hidden, onClose, formData }) {
    const total_price = [...formData.adults, ...formData.childs].reduce((acc, curr) => {
        return (acc += curr.price);
    }, 0);
    return (
        <Modal open={hidden} onClose={onClose}>
            <div className="p-6 max-w-full flex flex-col justify-center gap-3">
                <h1 className="text-center font-bold text-xl uppercase ">Thanh toán đơn hàng</h1>
                <CountdownTimer initialMinutes={1} />
                <p className="text-sm">Vui lòng thanh toán đơn hàng trong 10 phút để xác nhận đơn hàng!!!</p>
                <p className="text-sm">
                    <span className="text-red-600 font-bold">Lưu ý:</span> Sau 10 phút chưa thanh toán hệ thống sẽ tự
                    động hủy đơn hàng!!
                </p>
                <div className="bg-gray-200 p-4 rounded">
                    <h1 className="text-sm">
                        Tổng tiền cần thanh toán:{" "}
                        <span className="text-base font-bold text-red-700">
                            {formatPrice(total_price)} VNĐ
                        </span>
                    </h1>

                    <h1 className="text-sm my-2">Vui lòng chọn một phương thức để thanh toán</h1>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-500 text-center rounded-md">PAYPAL</div>
                        <VnPayPayment amount={total_price} formData={formData} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalPayment;
