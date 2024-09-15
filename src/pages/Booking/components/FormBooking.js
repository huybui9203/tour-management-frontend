import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiInformation2Fill } from "react-icons/ri";
import InforRegistant from "./InforRegistant";

function FormBooking() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        adult_quantity: 1,
        child_quantity: 0,
        baby_quantity: 0,
    });
    const [formError, setFormError] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const validatePhone = (id, value) => {
        const phoneRegex = /^0\d{9}$/;
        phoneRegex.test(value)
            ? setFormError((prev) => ({
                  ...prev,
                  [id]: "",
              }))
            : setFormError((prev) => ({
                  ...prev,
                  [id]: "Số điện thoại không hợp lệ",
              }));
    };

    const validateEmail = (id, value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailRegex.test(value)
            ? setFormError((prev) => ({
                  ...prev,
                  [id]: "",
              }))
            : setFormError((prev) => ({
                  ...prev,
                  [id]: "Email không hợp lệ",
              }));
    };

    const handleFormError = (e) => {
        if (e.target.value.trim() === "") {
            setFormError((prev) => ({
                ...prev,
                [e.target.id]: "Thông tin bắt buộc",
            }));
        } else {
            if (e.target.id === "phone") {
                validatePhone(e.target.id, e.target.value);
            }

            if (e.target.id === "email") {
                validateEmail(e.target.id, e.target.value);
            }
        }
    };

    const handleResetError = (e) => {
        setFormError((prev) => ({
            ...prev,
            [e.target.id]: "",
        }));
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <>
            <form className="border border-gray-200 p-3 rounded-lg mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Name */}
                <div className="flex flex-col gap-2 md:border-r">
                    <label className="font-bold">
                        Họ tên <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData?.name || ""}
                        onChange={handleChange}
                        placeholder="Nhập họ tên"
                        onFocus={handleResetError}
                        onBlur={handleFormError}
                        className="focus:outline-none text-sm py-1"
                    />
                    <p className="text-xs text-red-600 font-semibold">{formError?.name || ""}</p>
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">
                        Điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="phone"
                        value={formData?.phone || ""}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        className="focus:outline-none text-sm py-1"
                        onFocus={handleResetError}
                        onBlur={handleFormError}
                    />
                    <p className="text-xs text-red-600 font-semibold">{formError?.phone || ""}</p>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2 md:border-r">
                    <label className="font-bold">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="email"
                        value={formData?.email || ""}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        className="focus:outline-none text-sm py-1"
                        onFocus={handleResetError}
                        onBlur={handleFormError}
                    />
                    <p className="text-xs text-red-600 font-semibold">{formError?.email || ""}</p>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Địa chỉ</label>
                    <input
                        type="text"
                        id="address"
                        value={formData?.address || ""}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                        className="focus:outline-none text-sm py-1"
                    />
                </div>
            </form>

            <h1 className="text-sm font-bold mt-20">HÀNH KHÁCH</h1>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 mt-4 bg-gray-100 rounded-lg p-4">
                <div className="flex flex-col p-3 border border-blue-300 rounded-lg">
                    <h2 className="text-sm font-bold">Người lớn</h2>
                    <p className="text-sm flex items-center gap-2">
                        Từ 12 tuổi <RiInformation2Fill />
                    </p>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-1 mt-6">
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaMinus className="group-hover:text-blue-800" />
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={1}
                            className="bg-transparent self-center inline-block pointer-events-none outline-none w-10 text-center"
                        />
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaPlus className="group-hover:text-blue-800" />
                        </button>
                    </div>
                </div>

                {/* Child */}
                <div className="flex flex-col p-3 border border-blue-300 rounded-lg">
                    <h2 className="text-sm font-bold">Trẻ em</h2>
                    <p className="text-sm flex items-center gap-2">
                        Từ 2 - 11 tuổi <RiInformation2Fill />
                    </p>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-1 mt-6">
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaMinus className="group-hover:text-blue-800" />
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={1}
                            className="bg-transparent self-center inline-block pointer-events-none outline-none w-10 text-center"
                        />
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaPlus className="group-hover:text-blue-800" />
                        </button>
                    </div>
                </div>

                {/* Baby */}
                <div className="flex flex-col p-3 border border-blue-300 rounded-lg">
                    <h2 className="text-sm font-bold">Em bé</h2>
                    <p className="text-sm flex items-center gap-2">
                        Dưới 2 tuổi <RiInformation2Fill />
                    </p>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-1 mt-6">
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaMinus className="group-hover:text-blue-800" />
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={1}
                            className="bg-transparent self-center inline-block pointer-events-none outline-none w-10 text-center"
                        />
                        <button className="p-3 hover:bg-gray-200 rounded-lg group">
                            <FaPlus className="group-hover:text-blue-800" />
                        </button>
                    </div>
                </div>
            </div>

            <h1 className="text-sm font-bold mt-20">THÔNG TIN HÀNH KHÁCH</h1>
            <div className="flex items-center p-3 bg-gray-200 rounded-lg mt-4 gap-3">
                <input type="checkbox" className="w-6 h-6" />
                <p className="font-semibold text-sm md:text-base leading-6">
                    Tôi cần được nhân viên tư vấn Vietravel trợ giúp nhập thông tin đăng ký dịch vụ.
                </p>
            </div>

            <InforRegistant age={"ADULT"} />
            <InforRegistant age={"CHILD"} />

            <div>
                <h1 className="text-sm font-bold mt-14">GHI CHÚ</h1>
                <textarea
                    placeholder="Vui lòng nhập nội dung ghi chú"
                    className="text-sm mt-6 border w-full min-h-44 rounded-lg p-6 outline-none"
                ></textarea>
            </div>
        </>
    );
}

export default FormBooking;
