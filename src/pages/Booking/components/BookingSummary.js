import React, { useState } from "react";
import { BsTrainFront } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { GiAlarmClock } from "react-icons/gi";
import { MdOutlineDiscount } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { TiGroupOutline } from "react-icons/ti";

function BookingSummary() {
    const [isHidden, setHidden] = useState(true);
    return (
        <div className="shadow-slate-950 shadow-2xl bg-white md:col-span-2 fixed bottom-0 inset-x-0 z-50 p-6 rounded-t-3xl md:grid-cols-2 md:static md:z-0 md:rounded-lg md:shadow-md md:border">
            <div className="flex justify-between items-center border-b pb-1">
                <span className="font-bold text-lg text-blue-800">TÓM TẮT CHUYẾN ĐI</span>
                {isHidden ? (
                    <FaChevronUp
                        className="text-sm text-gray-800 cursor-pointer md:hidden"
                        onClick={() => setHidden(!isHidden)}
                    />
                ) : (
                    <FaChevronDown
                        className="text-sm text-gray-800 cursor-pointer md:hidden"
                        onClick={() => setHidden(!isHidden)}
                    />
                )}
            </div>
            <div className={`mt-6 ${!isHidden && "hidden md:block "} transition-all duration-700 max-h-[300px] md:max-h-none overflow-auto no-scrollbar`}>
                <div className="flex gap-3 items-center border-b pb-6">
                    <div className="w-[600px] h-[100px] rounded-md overflow-hidden">
                        <img
                            src="https://media.travel.com.vn/Tour/tfd__230505093419_958252.jpg"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="font-bold text-justify line-clamp-4 self-start">
                        Thái Lan: Bangkok - Pattaya - Ayutthaya (Khách sạn 5*, Làng Nong Nooch, Chợ nổi Bốn miền, Thưởng
                        thức buffet tối trên Du thuyền 5 sao & cafe máy bay Boeing 747)
                    </h1>
                </div>
                <div className="flex md:flex-col md:items-start xl:flex-row gap-4 items-center mt-3 border-b pb-3">
                    <h1 className="flex gap-1 items-center">
                        <SlLocationPin className="text-2xl" />
                        <span>Khởi hành: TP. Hồ Chí Minh</span>
                    </h1>
                    <h1 className="flex gap-1 items-center">
                        <GiAlarmClock className="text-2xl" />
                        <span>Thời gian: 5N4Đ</span>
                    </h1>
                </div>
                <div className="flex flex-col gap-2 mt-3 border-b pb-3">
                    <h1 className="flex items-center gap-1 mt-3">
                        <BsTrainFront className="text-2xl" />
                        <span className="font-bold text-sm">Phương tiện di chuyển</span>
                    </h1>
                    <h1 className="flex gap-1 items-center">Máy bay, Xe du lịch</h1>
                </div>
                <div className="border-b pb-3">
                    <h1 className="flex items-center gap-1 mt-3">
                        <TiGroupOutline className="text-2xl" />
                        <span className="font-bold text-sm">KHÁCH HÀNG + PHỤ THU</span>
                    </h1>
                    <div className="mt-3">
                        <h1 className="flex items-center justify-between">
                            <span className="font-bold text-sm">Người lớn</span>
                            <span className="font-bold text-sm text-red-600">1 x 10,990,000 đ</span>
                        </h1>
                        <h1 className="flex items-center justify-between mt-2">
                            <span className="font-bold text-sm">Phụ thu phòng đơn</span>
                            <span className="font-bold text-sm text-red-600">1,500,000 đ</span>
                        </h1>
                    </div>

                    <div className="mt-3">
                        <h1 className="flex items-center justify-between">
                            <span className="font-bold text-sm">Trẻ em</span>
                            <span className="font-bold text-sm text-red-600">1 x 10,990,000 đ</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="my-4">
                <h1 className="flex items-center gap-1">
                    <MdOutlineDiscount />
                    <span className="text-sm font-semibold">Sử dụng mã ưu đãi</span>
                </h1>
                <form className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 items-center gap-4 mt-3">
                    <input type="text" className="border border-blue-800 py-2 px-3 rounded-lg outline-none" />
                    <button type="submit" className="p-3 text-white bg-blue-800 rounded-lg text-xs">
                        ÁP DỤNG
                    </button>
                </form>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold">Tổng tiền</h1>
                <h1 className="font-bold text-red-600 text-xl">9,990,000 đ</h1>
            </div>

            <button className="bg-blue-800 w-full py-2 text-white mt-2 rounded-lg">ĐẶT TOUR</button>
        </div>
    );
}

export default BookingSummary;
