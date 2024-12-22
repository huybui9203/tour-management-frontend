import React, { useEffect, useState } from "react";
function InforRegistant({ age, index, handleSetInforRegistant, price }) {
    const [maxDay, setMaxDay] = useState(() => {
        if (age === "ADULT") {
            return new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toISOString().split("T")[0];
        } else if (age === "CHILD") {
            return new Date(new Date().setFullYear(new Date().getFullYear() - 11)).toISOString().split("T")[0];
        } else return new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split("T")[0];
    });
    const [formData, setFormData] = useState({
        index: index,
        name: "",
        type: age,
        sex: 0,
        price: price,
        birthday: maxDay,
        isBookingSingleRoom: index === 0 ? true: false,
    });
    
    const [formError, setFormError] = useState({
        name: "",
        birthday: "",
    });

    useEffect(() => {
        handleSetInforRegistant(formData);
    }, [formData]);

    const validateBirthday = (id, value, max) => {
        // console.log(value, max);
        if (new Date(value).getFullYear() > new Date(max).getFullYear()) {
            setFormError((prev) => ({
                ...prev,
                [id]: "Ngày không hợp lệ",
            }));
        }
    };
    const handleFormError = (e) => {
        if (e.target.value.trim() === "") {
            setFormError((prev) => ({
                ...prev,
                [e.target.id]: "Thông tin bắt buộc",
            }));
        } else {
            if (e.target.id === "birthday") {
                validateBirthday(e.target.id, e.target.value, e.target.max);
            }
        }
    };
    const handleResetError = (e) => {
        setFormError((prev) => ({
            ...prev,
            [e.target.id]: "",
        }));
    };
    // console.log(formData);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    return (
        <div className="mt-10">
            <h1 className="font-bold text-sm">
                {age === "ADULT" && (
                    <>
                        Người lớn <span className="font-medium italic">(Từ 12 tuổi)</span>
                    </>
                )}
                {age === "CHILD" && (
                    <>
                        Trẻ em <span className="font-medium italic">(Từ 2-11 tuổi)</span>
                    </>
                )}
                {age === "BABY" && (
                    <>
                        Em bé <span className="font-medium italic">(Dưới 2 tuổi)</span>
                    </>
                )}
            </h1>

            <div
                className={`border border-gray-200 p-3 rounded-lg mt-3 grid grid-cols-1 ${
                    age === "ADULT" ? "md:grid-cols-2 xl:grid-cols-3" : "xl:grid-cols-2"
                } items-center gap-3`}
            >
                {/* name */}
                <div className="flex flex-col gap-2 xl:border-r md:col-span-2 xl:col-span-1">
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

                <div
                    className={`grid items-center ${
                        age === "ADULT" ? "md:grid-cols-1 xl:grid-cols-3 md:col-span-2 xl:col-span-2" : ""
                    } gap-3`}
                >
                    <div className={`grid grid-cols-2 ${age === "ADULT" ? "xl:col-span-2" : ""} gap-3 items-start`}>
                        {/* Sex */}
                        <div className="flex flex-col gap-2 border-r">
                            <label className="font-bold">
                                Giới tính <span className="text-red-600">*</span>
                            </label>
                            <select id="sex" className="text-sm font-semibold outline-none" onChange={(e) => setFormData(prev=>({...prev, sex: e.target.value === "MALE" ? 0 : 1}))}>
                                <option value={"MALE"}>Nam</option>
                                <option value={"FEMALE"}>Nữ</option>
                            </select>
                        </div>
                        {/* Birthday */}
                        <div className={`flex flex-col gap-2 ${age === "ADULT" && "xl:border-r"}`}>
                            <label className="font-bold">
                                Ngày sinh <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="date"
                                id="birthday"
                                value={formData?.birthday || maxDay}
                                onChange={handleChange}
                                onFocus={handleResetError}
                                onBlur={handleFormError}
                                max={maxDay}
                                className="outline-none"
                            />
                            <p className="text-xs text-red-600 font-semibold">{formError?.birthday || ""}</p>
                        </div>
                    </div>

                    {age === "ADULT" && (
                        <div className="text-center md:text-left sm:text-left">
                            <h1 className="font-bold text-sm">Phòng đơn</h1>
                            <label className="relative inline-block w-10 h-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="isBookingSingleRoom"
                                    className="sr-only peer"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            price: e.target.checked ? prev.price + 1500000 : prev.price - 1500000,
                                            [e.target.id]: e.target.checked,
                                        }))
                                    }
                                    checked={formData?.isBookingSingleRoom}
                                />
                                <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-500"></div>
                                <div className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-5 shadow-md"></div>
                            </label>
                            <p className="text-gray-500 font-bold text-sm italic">1,500,000 đ</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InforRegistant;
