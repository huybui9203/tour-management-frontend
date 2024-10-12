import { useContext, useState } from "react"
import Modal from "../../../components/Modal/Modal"
import axios from "axios"
import { BookingContext } from "./Booking"
import { ORDER_STATUS_CODE } from "../../../utils/constants"

const EditBookingStatus = ({open, onClose, orderId}) => {
    const [status, setStatus] = useState(ORDER_STATUS_CODE.NONE)
    const reloadData = useContext(BookingContext)

    console.log(status)
    const handleUpDate = async () => {
        if(status == ORDER_STATUS_CODE.NONE) {
            onClose()
            return
        }

        const formData = {
            orderId,
            statusId: status
        }

        try {
            await axios.post(process.env.REACT_APP_URL+'/admin/bookings/' + orderId, formData, {
                withCredentials: true,
            })
            reloadData(true)
            setStatus(ORDER_STATUS_CODE.NONE)
        } catch (error) {
            console.log(error)
            alert('Da xay ra loi')
        }
        onClose()
        
    }

    return (
        <Modal open={open} onClose={() => onClose()}>
            <div className="h-60 p-2">
                <h1 className="font-bold text-lg">Cập nhật trạng thái đơn đặt</h1>
                <select onChange={(e) => setStatus(e.target.value)}>
                    <option value={ORDER_STATUS_CODE.NONE}>--Chọn trạng thái--</option>
                    <option value={ORDER_STATUS_CODE.PENDING}>Đang chờ xử lý</option>
                    <option value={ORDER_STATUS_CODE.SUCCESSFUL}>Đã thanh toán</option>
                    <option value={ORDER_STATUS_CODE.CANCELED}>Đã hủy</option>
                    <option value={ORDER_STATUS_CODE.REFUND}>Đền bù</option>
                </select>
                <button onClick={() => onClose()}>Hủy</button>
                <button disabled={status == ORDER_STATUS_CODE.NONE} onClick={handleUpDate}>Xác nhận</button>
            </div>
        </Modal>
    )
}

export default EditBookingStatus