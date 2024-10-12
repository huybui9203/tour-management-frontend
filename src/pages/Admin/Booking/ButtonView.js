import { useEffect, useState } from "react"
import Modal from "../../../components/Modal/Modal"
import axios from "axios"


const ButtonView = ({orderId, label}) => {
    const [isShowView, setShowView] = useState(false)
    const [bookingData, setBookingData] = useState(null)

    const handleView = async () => {
        setShowView(true)
        try {
            const res = await axios.get(process.env.REACT_APP_URL + '/admin/bookings/' + orderId, {withCredentials: true})
            if(res?.data) {
                setBookingData(res.data)
            }
        } catch (error) {
            alert('Đã xảy ra lỗi!')
        }
    }

    console.log(bookingData)
    return (
        <div>
            <button className='text-blue-500 font-bold decoration-solid' onClick={handleView}>{'#' +label}</button>
            <Modal open={isShowView} onClose={() => setShowView(false)}>
                <h1 className="font-bold text-2xl">Chi tiết đơn đặt #{orderId}</h1>
                {bookingData && (
                    <div>
                        <p>Khách hàng #{bookingData?.customer.id}: {bookingData?.customer.name}</p>
                        <p>Tour: {bookingData?.tour_day.tour.name}</p>
                        <p>Ngày đặt: {bookingData.order_date}</p>
                        <p>Số người tham gia: {bookingData.number_of_people}</p>
                        <p>Số người lớn: {bookingData.adults_count}</p>
                        <p>Số trẻ em: {bookingData.children_count}</p>
                        <p>Số phòng đơn: {bookingData.rooms_count}</p>
                        <p>Trạng thái: {bookingData?.status.ele_name}</p>
                        <p>Tổng tiền: {bookingData.total_price} VNĐ</p>
                        <p>Ngày thanh toán: {bookingData.order_date}</p>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ButtonView