import { FaUser } from "react-icons/fa";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { BsCalendar2Day } from "react-icons/bs";
import { FaRegIdCard } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import FacebookAuth from "../FacebookAuth/FacebookAuth";
const RegistrationForm = () => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="lg:w-2/3 md:w-5/6 md:max-w-[850px] mx-auto max-w-none px-4">
                    <div className="border bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-center text-red-500">ĐĂNG KÍ</h3>
                        </div>
                        <div className="mb-4">
                            <form action="#" method="POST">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative ">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaUser className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none  w-full"
                                                        placeholder="Họ tên"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <BsCalendar2Day className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Ngày sinh"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <PiGenderIntersexBold className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Giới tính"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaRegIdCard className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="CCCD"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaPhoneAlt className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Di động"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <IoMdMail className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Email"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaHouseUser className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Địa chỉ"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaLock className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="password"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Mật khẩu"
                                                        required
                                                    />
                                                </div>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                                    <FaEye className="h-4 w-4 text-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                                    <FaLock className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="border rounded-md border-gray-400 overflow-hidden">
                                                    <input
                                                        type="password"
                                                        className="pl-10 py-2 border-none outline-none w-full"
                                                        placeholder="Xác nhận mật khẩu"
                                                        required
                                                    />
                                                </div>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                                    <FaEyeSlash className="h-4 w-4 text-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-3 mb-4">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="rule"
                                                    id="rule"
                                                    className="form-checkbox"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    Tôi đã đọc và đồng ý các điều khoản bên dưới
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className=" md:max-w-[250px] mx-auto max-w-none">
                                        <button
                                            type="submit"
                                            className="bg-red-500 text-white w-full py-2 rounded-full hover:bg-red-600 transition"
                                        >
                                            Đăng kí
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="text-center py-4 border-t relative flex items-center justify-center">
                            <FacebookAuth />
                            <span>or</span>
                            <GoogleAuth />
                            <div className="absolute top-[-13px] left-1/2 transform -translate-x-1/2 bg-white">
                                or connect with
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
