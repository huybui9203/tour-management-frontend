import axios from "axios";
import React from "react";

function VnPayPayment({ formData, amount }) {
    const handlePayment = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_URL}/order/pay-vnpay`,
            {
                amount: amount,
                orderDescription: `Thanh toán đơn hàng mới`,
            },
            { withCredentials: true }
        );

        const { paymentUrl } = res.data;

        const popup = window.open(paymentUrl, "VNPAY", "width=800,height=600");

        if (popup) {
            popup.focus();
        } else {
            alert("Vui lòng tắt chặn popup để tiếp tục thanh toán");
        }
    };

    return (
        <div className="border border-slate-700 rounded w-full p-2 cursor-pointer" onClick={handlePayment}>
            <img src="../logo-vnpay.webp" className="w-full object-cover" />
        </div>
    );
}

export default VnPayPayment;
