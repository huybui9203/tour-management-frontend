import { ORDER_STATUS_CODE } from "../utils/constants"

const LabelBookingStatus = ({label, statusCode}) => {
    //dang cho |đa thanh toan | đã huy | phat
    const bgAndColor = () => {
        switch (statusCode) {
            case ORDER_STATUS_CODE.PENDING:
                return 'bg-amber-500 text-white'
            case ORDER_STATUS_CODE.SUCCESSFUL: 
                return 'bg-green-400 text-white'
            case ORDER_STATUS_CODE.CANCELED: 
                return 'bg-red-600 text-white'
            case ORDER_STATUS_CODE.REFUND: 
                return  'bg-red-200 text-red-600'
            default:
                throw new Error('invalid status')
        }
    }

    return (
        <div className={`rounded-md px-1 min-w-24 py-1 text-center text-sm ${bgAndColor()}`}>{label}</div>
    )
}
export default LabelBookingStatus