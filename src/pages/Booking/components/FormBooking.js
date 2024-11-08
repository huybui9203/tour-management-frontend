import React, { useCallback, useEffect, useState } from "react";
import InforRegistant from "./InforRegistant";
import QuantityRegistant from "./QuantityRegistant";
import BookingSummary from "./BookingSummary";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function FormBooking({ title }) {
    const [tour, setTour] = useState({});
    
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: title,
        name: "",
        phone: "",
        email: "",
        address: "",
        adult_quantity: 1,
        child_quantity: 0,
        adults: [],
        childs: [],
    });
    console.log(formData);

    const [formError, setFormError] = useState({
        name: "",
        phone: "",
        email: "",
    });


    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/tour/get-details/${title}`);
        if (res.status !== 200) {
            console.log(res.data.message);
            return;
        }
        setTour(res.data.tour);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleSetInforAdults = useCallback((data) => {
        setFormData((prev) => {
            // Kiểm tra nếu index mới là độ dài hiện tại của registant
            if (data.index === prev.adults.length) {
                return {
                    ...prev,
                    adults: [...prev.adults, data],
                };
            }

            // Cập nhật registant dựa trên index
            return {
                ...prev,
                adults: prev.adults.map((item) =>
                    item.index === data.index && item.type === data.type ? { ...item, ...data } : item
                ),
            };
        });
    }, []);

    const handleSetInforChilds = useCallback((data) => {
        setFormData((prev) => {
            // Kiểm tra nếu index mới là độ dài hiện tại của registant
            if (data.index === prev.childs.length) {
                return {
                    ...prev,
                    childs: [...prev.childs, data],
                };
            }

            // Cập nhật registant dựa trên index
            return {
                ...prev,
                childs: prev.childs.map((item) =>
                    item.index === data.index && item.type === data.type ? { ...item, ...data } : item
                ),
            };
        });
    }, []);

    const handlePopDataRegistant = useCallback((type) => {
        setFormData((prev) => {
            if (type === "ADULT") {
                return {
                    ...prev,
                    adults: prev.adults.slice(0, -1),
                };
            }
            return {
                ...prev,
                childs: prev.childs.slice(0, -1),
            };
        });
    }, []);

    return (
        !loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-3">
                <div className="lg:col-span-3">
                    <div className="border border-gray-200 p-3 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    </div>

                    <h1 className="text-sm font-bold mt-20">HÀNH KHÁCH</h1>
                    <div className="grid grid-cols-2 gap-6 mt-4 bg-gray-100 rounded-lg p-4">
                        {/* adult */}
                        <QuantityRegistant
                            type={"adult"}
                            quantity={formData.adult_quantity}
                            onDecrease={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    adult_quantity: prev.adult_quantity - 1,
                                }));
                            }}
                            onIncrease={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    adult_quantity: prev.adult_quantity + 1,
                                }));
                            }}
                            onHandleDataRegistant={() => handlePopDataRegistant("ADULT")}
                        />

                        {/* Child */}
                        <QuantityRegistant
                            type={"child"}
                            quantity={formData.child_quantity}
                            onDecrease={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    child_quantity: prev.child_quantity - 1,
                                }));
                            }}
                            onIncrease={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    child_quantity: prev.child_quantity + 1,
                                }));
                            }}
                            onHandleDataRegistant={() => handlePopDataRegistant("CHILD")}
                        />
                    </div>

                    <h1 className="text-sm font-bold mt-20">THÔNG TIN HÀNH KHÁCH</h1>
                    <div className="flex items-center p-3 bg-gray-200 rounded-lg mt-4 gap-3">
                        <input type="checkbox" className="w-6 h-6" />
                        <p className="font-semibold text-sm md:text-base leading-6">
                            Tôi cần được nhân viên tư vấn Vietravel trợ giúp nhập thông tin đăng ký dịch vụ.
                        </p>
                    </div>

                    {Array(formData.adult_quantity)
                        .fill(0)
                        .map((item, index) => (
                            <InforRegistant
                                age={"ADULT"}
                                index={index}
                                key={index}
                                price={tour.price}
                                handleSetInforRegistant={handleSetInforAdults}
                            />
                        ))}
                    {Array(formData.child_quantity)
                        .fill(0)
                        .map((item, index) => (
                            <InforRegistant
                                age={"CHILD"}
                                index={index}
                                key={index}
                                price={tour.price * 0.9}
                                handleSetInforRegistant={handleSetInforChilds}
                            />
                        ))}

                    <div>
                        <h1 className="text-sm font-bold mt-14">GHI CHÚ</h1>
                        <textarea
                            placeholder="Vui lòng nhập nội dung ghi chú"
                            className="text-sm mt-6 border w-full min-h-44 rounded-lg p-6 outline-none"
                        ></textarea>
                    </div>
                </div>
                <BookingSummary formData={formData} tour={tour} />
                
            </div>
        ) : <div className="flex justify-center items-center py-3">
            <AiOutlineLoading3Quarters className="animate-spin duration-500 text-lg opacity-80" />
        </div>
    );
}

export default FormBooking;
