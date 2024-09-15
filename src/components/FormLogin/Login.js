import { FaUser } from "react-icons/fa";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { BsCalendar2Day } from "react-icons/bs";
import { FaRegIdCard } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye,FaEyeSlash  } from "react-icons/fa";
const Login = () => {

    return (
        <div className="my-20">
            <section className="mt-5 mb-5">
              <div className="container mx-auto">
                <div className="flex justify-center items-center h-full" >
                  <div className="lg:w-1/3 md:w-2/3 sm:w-full w-full">
                    <div className="border bg-white shadow-lg rounded-lg">
                      <div className="text-center">
                        <h3 className="pt-4 font-bold text-3xl mb-2">Login</h3>
                      </div>
                      <div className="p-4">
                        <form action="#" method="POST">
                          <div className="py-2">
                            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                                 <FaUser className="h-3 w-3 text-blue-500 mr-2" />
                              <input
                                type="text"
                                placeholder="Username or Email"
                                className="w-full focus:outline-none"
                                required
                              />
                            </div>
                          </div>
                          <div className="py-1 pb-2">
                            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                            <FaLock className="h-3 w-3 text-blue-500 mr-2" />
                              <input
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full focus:outline-none"
                                required
                              />
                              <button type="button" className="ml-2 text-gray-500">
                                <span className="icon-eye-slash"></span>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2 ">
                            <label className="inline-flex items-center text-gray-600 cursor-pointer">
                              <input
                                type="checkbox"
                                name="remember"
                                className="mr-2"
                              />
                              Remember me
                            </label>
                            <a href="#" className=" font-extrabold" style={{color: "#f85959"}}>Forgot password?</a>
                          </div>
                          <button
                            type="submit"
                            className="text-lg w-full text-white font-bold py-1 rounded-2xl mt-4 px-2 bg-red-500 hover:bg-white border border-red-400 hover:text-red-400"
                          >
                            Login
                          </button>
                          <div className="text-center pt-6 text-gray-600">
                            Don't have an account? <a href="#" className="" style={{color: "#f85959"}}>Sign up</a>
                          </div>
                        </form>
                      </div>
                      <div className="text-center py-4 border-t border-gray-400 relative my-2 mx-4">
                        <a href="https://www.facebook.com" target="_blank" className="inline-block px-3">
                          <img src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt="Facebook" className="w-10 h-10 p-0 mt-2 rounded-full object-cover object-center"/>
                        </a>
                        <a href="https://www.google.com" target="_blank" className="inline-block px-3">
                          <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="Google" className="w-10 h-10 p-0 mt-2 rounded-full object-cover object-center"/>
                        </a>
                        <div className="absolute px-2 top-[-13px] left-1/2 transform -translate-x-1/2 bg-white">or connect with</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
    );
} ;

export default Login