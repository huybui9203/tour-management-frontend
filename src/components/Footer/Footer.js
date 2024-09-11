import styles from './Footer.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-gray-900 py-10">
        <div className="container md:w-5/6 w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 mt-10">
            <div className="col">
              <div className="mb-6">
                <h2 className="text-white text-2xl font-bold">Travel Go</h2>
                <p className="text-gray-400">Chinh phục mọi điểm đến, tận hưởng trọn vẹn từng khoảnh khắc!</p>
                <ul className="flex space-x-4 mt-5">
                    <li className='p-2 border border-white rounded-full'><a href="#" className="text-white hover:text-blue-700"><FaFacebook /></a></li>
                    <li className='p-2 border border-white rounded-full'><a href="#" className="text-white hover:text-blue-700"><FaFacebookMessenger /></a></li>
                    <li className='p-2 border border-white rounded-full'><a href="#" className="text-white hover:text-pink-500"><FaInstagram /></a></li>
                    <li className='p-2 border border-white rounded-full'><a href="#" className="text-white hover:text-blue-700"><FaTiktok /></a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="mb-6">
                <h2 className="text-white text-xl font-semibold">Thông tin</h2>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Tin tức</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Chính sách riêng tư</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản thỏa thuận </a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Chính sách bảo vệ dữ liệu cá nhân</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Trợ giúp</a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="mb-6">
                <h2 className="text-white text-xl font-semibold">Các loại tour</h2>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white ">Cao cấp</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Tiết kiệm</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Tiêu chuẩn</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Giá tốt</a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="mb-6">
                <h2 className="text-white text-xl font-semibold">Liên hệ</h2>
                <div className="text-gray-400">
                  <ul className='mt-2'>
                    <li className='flex '><FaLocationDot className='w-4 h-4 p-0' /><span className="ml-2">Số 3 Đ. Cầu Giấy, Ngọc Khánh, Đống Đa, Hà Nội</span></li>
                    <li className='flex items-center'><FaPhoneAlt  className='w-4 h-4' />  <a href="#" className="hover:text-white"><span className="ml-2">(+84) 123456789</span></a></li>
                    <li className='flex items-center'><IoMdMail  className='w-4 h-4' /><a href="#" className="hover:text-white"><span className="ml-2">utc@gmail.com</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center  text-gray-400">
            <p className='items-center'>
              &copy; All rights reserved | This template is made with <FaHeart  className='inline items-center text-red-500 mb-2'/> by <a>UTC</a>
            </p>
          </div>
        </div>
      </footer>
      
    )
} 

export default Footer