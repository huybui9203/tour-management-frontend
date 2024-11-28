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
        
        if(status == ORDER_STATUS_CODE.NONE || status == ORDER_STATUS_CODE.CANCELED) {
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
            <div className=" p-4 bg-white rounded-lg shadow-lg mx-auto max-w-md">
                <h1 className="font-bold text-xl text-gray-800 mb-4">Cập nhật trạng thái đơn đặt</h1>
                <select 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none "
                >
                    <option value={ORDER_STATUS_CODE.NONE}>--Chọn trạng thái--</option>
                    <option value={ORDER_STATUS_CODE.PENDING}>Đang chờ xử lý</option>
                    <option value={ORDER_STATUS_CODE.SUCCESSFUL}>Đã thanh toán</option>
                    <option value={ORDER_STATUS_CODE.CANCELED}>Đã hủy</option>
                    <option value={ORDER_STATUS_CODE.REFUND}>Đền bù</option>
                </select>

                <div className="flex justify-end space-x-3">
                    <button 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" 
                    onClick={() => onClose()}
                    >
                    Hủy
                    </button>
                    <button 
                    className={`px-4 py-2 rounded-lg text-white ${status === ORDER_STATUS_CODE.NONE ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`} 
                    onClick={handleUpDate} 
                    disabled={status === ORDER_STATUS_CODE.NONE}
                    >
                    Xác nhận
                    </button>
                </div>
</div>

        </Modal>
    )
}

export default EditBookingStatus