import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { Suspense, useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
const Login = () => {
    const GoogleAuth = React.lazy(() => import("../GoogleAuth/GoogleAuth"));
    const FacebookAuth = React.lazy(() => import("../FacebookAuth/FacebookAuth"));
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { setUser } = useContext(AuthContext);

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
            const res = await axios.post(process.env.REACT_APP_URL + "/auth/login", formData, {
                withCredentials: true,
            });

            if (res.status !== 200) {
                console.log(res.message);
            }
            setUser(res.data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

    return (
        <div className="my-20">
            <section className="mt-5 mb-5">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center h-full">
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
                                                    {!showPassword ? <FaEye /> : <FaEyeSlash />}
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
                                            className="text-lg w-full text-white font-bold py-3 rounded-full mt-4 bg-red-500 hover:bg-white transition-colors duration-300 border border-red-400 hover:text-red-400"
                                        >
                                            Đăng nhập
                                        </button>
                                        <div className="text-center pt-6 text-gray-600 text-sm font-semibold">
                                            Chưa có tài khoản?{" "}
                                            <Link to="/register" className="" style={{ color: "#f85959" }}>
                                                Đăng ký
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-center py-4 border-t border-gray-400 relative my-2 mx-4">
                                    {/* <Suspense fallback={<div>FB</div>}>
                                        <FacebookAuth />
                                    </Suspense> */}
                                    <Suspense fallback={<div>GG</div>}>
                                        <GoogleAuth />
                                    </Suspense>
                                    <div className="text-sm absolute px-3 top-[-13px] left-1/2 transform -translate-x-1/2 bg-white">
                                        hoặc kết nối với
                                    </div>
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
