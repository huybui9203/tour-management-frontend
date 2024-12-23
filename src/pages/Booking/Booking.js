import React, { useContext } from "react";
import { FaArrowLeftLong, FaCircleUser, FaRightLong } from "react-icons/fa6";
import FormIcon from "./svg/FormIcon";
import PayIcon from "./svg/PayIcon";
import ConfirmIcon from "./svg/ConfirmIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormBooking from "./components/FormBooking";
import { AuthContext } from "../../context/Auth";

function Booking() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="flex justify-start items-center gap-2" onClick={() => navigate(-1)}>
                <FaArrowLeftLong />
                <h3 className="cursor-pointer py-4">Quay lại</h3>
            </div>

            <h1 className="font-bold text-center text-2xl uppercase text-blue-800 py-5">Đặt tour</h1>

            <div className="flex justify-center items-center gap-8 xl:gap-14">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className={`bg-blue-800 rounded-full flex justify-center items-center w-12 h-12`}>
                        <FormIcon />
                    </div>
                    <h1 className="text-sm md:text-base xl:text-xl md:uppercase font-semibold text-blue-800">
                        Nhập thông tin
                    </h1>
                </div>
                <FaRightLong className="self-end text-gray-400 text-base md:text-xl" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className={`bg-gray-400 rounded-full flex justify-center items-center w-12 h-12`}>
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

            <div className="mt-20">
                    {/* <div className="flex items-center p-3 bg-gray-200 rounded-lg gap-3" hidden={!user}>
                        <FaCircleUser size={30} />
                        <p className="text-blue-600 text-sm md:text-base leading-6">
                            <Link to={"/login"} className="font-bold text-blue-800 underline">
                                Đăng nhập
                            </Link>{" "}
                            để nhận ưu đãi, tích điểm và quản lý đơn hàng dễ dàng hơn!
                        </p>
                    </div> */}
               
                <h3 className="text-sm font-bold mt-4">THÔNG TIN LIÊN LẠC</h3>

                <FormBooking title={id} />
            </div>
        </div>
    );
}

export default Booking;
