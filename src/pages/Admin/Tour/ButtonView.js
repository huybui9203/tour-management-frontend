import { useEffect, useState } from "react"
import Modal from "../../../components/Modal/Modal"
import axios from "axios"


const ButtonView = ({id, label}) => {
    const [isShowView, setShowView] = useState(false)
    const [tourData, setTourData] = useState(null)

    const handleView = async () => {
        setShowView(true)
        try {
            const res = await axios.get(process.env.REACT_APP_URL + '/admin/tours/' + id, {withCredentials: true})
            if(res?.data) {
                setTourData(res.data)
            }
        } catch (error) {
            alert('Đã xảy ra lỗi!')
        }
    }

    console.log(tourData)
    return (
        <div>
            <button className='text-blue-500 font-bold decoration-solid' onClick={handleView}>{'#' +label}</button>
            <Modal open={isShowView} onClose={() => setShowView(false)}>
                <h1 className="font-bold text-2xl">Chi tiết tour #{id}</h1>
                {tourData && (
                    <div>
                        <p>Tour: {tourData.name}</p>
                
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ButtonView