

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { Suspense, useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {setUser} = useContext(AuthContext)

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "", // Xóa lỗi của trường hiện tại
        }));
    };

  const handleSubmitLogin = async (e) => {
    console.log('admin submit')
    e.preventDefault();

        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email không được để trống.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu ít nhất 6 ký tự";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const res = await axios.post(process.env.REACT_APP_URL + "/admin/auth/login", formData, {
                withCredentials: true,
            });

            if (res.status !== 200) {
                console.log(res.message);
            }
            setUser(res.data)
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error);
            alert('Đã xảy ra lỗi hoặc tài khoản không có quyền truy cập')
        }
    };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

    return (
        <div className="bg-blue-300 h-full">
            <section className="mb-5 h-full flex">
                <div className="container m-auto flex">
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="w-full md:w-3/4 lg:w-2/5 mx-3">
                            <div className="border bg-white px-6 shadow-lg rounded-lg">
                                <div className="text-center">
                                    <h3 className="pt-4 font-bold text-3xl mb-2">Đăng nhập</h3>
                                </div>
                                <div className="p-4">
                                    <form method="POST" onSubmit={handleSubmitLogin}>
                                        <div className="py-2">
                                            <div
                                                className={`flex items-center border rounded-md px-3 py-2 ${
                                                    errors.email ? "border-red-500" : ""
                                                }`}
                                            >
                                                <MdEmail className="h-4 w-4 text-blue-500 mr-2" />
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={formData?.email || ""}
                                                    onChange={handleChange}
                                                    placeholder="Vui lòng nhập email"
                                                    className="w-full focus:outline-none text-sm py-1"
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 font-semibold text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="py-1 pb-2 mt-4">
                                            <div
                                                className={`flex items-center border rounded-md px-3 py-2 ${
                                                    errors.password ? "border-red-500" : ""
                                                }`}
                                            >
                                                <FaLock className="h-3 w-3 text-blue-500 mr-2" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    value={formData?.password || ""}
                                                    onChange={handleChange}
                                                    placeholder="Vui lòng nhập mật khẩu"
                                                    className="w-full focus:outline-none text-sm py-1"
                                                />
                                                <div type="button" className="ml-2" onClick={handleShowPassword}>
                                                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </div>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 font-semibold text-xs mt-1">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>
                                        {/* <div className="flex items-center justify-between py-2 ">
                                            <label className="inline-flex items-center text-gray-600 cursor-pointer text-sm">
                                                <input type="checkbox" name="remember" className="mr-2 size-4" />
                                                Nhớ đăng nhập
                                            </label>
                                            <a href="#" className=" font-extrabold text-red-500 text-sm">
                                                Quên mật khẩu?
                                            </a>
                                        </div> */}
                                        <button
                                            type="submit"
                                            className="text-lg w-full text-white font-bold py-3 rounded-full mt-4 bg-blue-600 hover:bg-white transition-colors duration-300 border border-blue-600 hover:text-blue-600"
                                        >
                                            Đăng nhập
                                        </button>
                                       
                                    </form>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
