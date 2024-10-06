import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FacebookAuth from "../FacebookAuth/FacebookAuth";
const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(process.env.REACT_APP_URL+"/auth/signup", formData);
            if (res.status !== 200) {
                console.log(res.message);
            }
            navigate("/login");
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
                        <div className="w-full md:w-2/3 lg:w-2/5 mx-3">
                            <div className="border bg-white px-6 shadow-lg rounded-lg">
                                <div className="text-center">
                                    <h3 className="pt-4 font-bold text-3xl mb-2">Đăng ký</h3>
                                </div>
                                <div className="p-4">
                                    <form action="#" method="POST" onSubmit={handleSubmitSignup}>
                                        <div className="py-2">
                                            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                                                <FaUser className="h-3 w-3 text-blue-500 mr-2" />
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={formData?.email || ""}
                                                    onChange={handleChange}
                                                    placeholder="Vui lòng nhập email"
                                                    className="w-full focus:outline-none text-sm py-1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                                                <FaUser className="h-3 w-3 text-blue-500 mr-2" />
                                                <input
                                                    type="text"
                                                    id="username"
                                                    value={formData?.username || ""}
                                                    onChange={handleChange}
                                                    placeholder="Vui lòng nhập username"
                                                    className="w-full focus:outline-none text-sm py-1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="py-1 pb-2">
                                            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                                                <FaLock className="h-3 w-3 text-blue-500 mr-2" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    value={formData?.password || ""}
                                                    onChange={handleChange}
                                                    placeholder="Vui lòng nhập mật khẩu"
                                                    className="w-full focus:outline-none text-sm py-1"
                                                    required
                                                />
                                                <button type="button" className="ml-2" onClick={handleShowPassword}>
                                                    {!showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-lg w-full text-white font-bold py-3 rounded-full mt-4 bg-red-500 hover:bg-white transition-colors duration-300 border border-red-400 hover:text-red-400"
                                        >
                                            Đăng ký
                                        </button>
                                        <div className="text-center pt-6 text-gray-600 text-sm font-semibold">
                                            You have an account?{" "}
                                            <Link to="/login" className="" style={{ color: "#f85959" }}>
                                                Log in
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-center py-4 border-t border-gray-400 relative my-2 mx-4">
                                    <FacebookAuth />
                                    <GoogleAuth />
                                    <div className="absolute px-2 top-[-13px] left-1/2 transform -translate-x-1/2 bg-white">
                                        or connect with
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

export default SignupForm;
