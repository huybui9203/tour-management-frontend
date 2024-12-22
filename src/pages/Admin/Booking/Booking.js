
import { createContext, useEffect, useMemo, useState } from 'react'
import axios from "axios";
import LabelBookingStatus from '../../../components/LabelBookingStatus';
import Table from '../../../components/Table'
import ButtonMore from './ButtonMore';
import ButtonView from './ButtonView';
import formatLocalDate from '../../../utils/formatLocalDate';
import CreateBooking from './CreateBooking';
const columns = [
    {
        name: "Id đơn đặt",
        selector: (row) => row.orderId,
        sortable: true,
        button: true,
		cell: (row) => <ButtonView orderId={row.orderId} label={row.orderId}/>
    },
    {
        name: "Khách hàng",
        selector: (row) => row.customerName,
        sortable: true,
    },
    {
        name: "Tên tour",
        selector: (row) => row.tourName,
        sortable: true,
    },
    {
        name: "Ngày đặt",
        selector: (row) => row.orderDate,
        sortable: true,
        cell: (row) => <div><p className='font-bold'>{formatLocalDate(row.orderDate)?.slice(0,10)}</p><p>{formatLocalDate(row.orderDate)?.slice(11,19)}</p></div>
    },
    {
        name: "Ngày thanh toán",
        selector: (row) => row.paymentDate,
        sortable: true,
        cell: (row) => <div><p className='font-bold'>{formatLocalDate(row.paymentDate)?.slice(0,10)}</p><p>{formatLocalDate(row.paymentDate)?.slice(11,19)}</p></div>
    },
    {
        name: "Trạng thái",
        selector: (row) => row.orderStatus,
    },

    {
        // name: "Trạng thái",
        // selector: (row) => row.orderStatus,
        name: 'More',
        button: true,
		cell: (row) => <ButtonMore orderId={row.orderId}/>
    },
];

const typeForms = {
    EDIT: 'edit',
    DELETE: 'delete'
}

export const BookingContext = createContext()

const Booking = () => {
    const [listBookings, setListBookings] = useState([])
    const [stale, setStale] = useState(false)
    const [tab, setTab] = useState(0)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

    const getTableData = useMemo(() => {
        const tableData = []
        listBookings.map(item => {
            if(item.status.ele_id == tab || tab == 0) {
                const record = {
                    orderId: item.id,
                    customerName: item.customer?.name,
                    tourName: item.tour_day.tour?.name,
                    orderDate: item.order_date,
                    paymentDate: item.pay_date,
                    orderStatus: <LabelBookingStatus label={item.status.ele_name} statusCode={item.status.ele_id}/>,
                }
                tableData.push(record)
            }
            
        }) 
        return tableData
    }, [listBookings, tab])


    useEffect(() => {
        const fetchListBookings = async () => {
            const data = await axios.get(process.env.REACT_APP_URL + '/admin/bookings', {withCredentials: true}).then(res => res.data).catch(err => console.log(err))
            if(!data) {
                return
            }
            setListBookings(data)
            if(stale) {
                setStale(false)

            }
        }

        fetchListBookings()
    }, [stale])

    return (
        <BookingContext.Provider value={setStale}>
            <div className='relative'>
                <ul className='flex absolute left-0 top-1'>
                    {['Tất cả', 'Đang chờ', 'Đã thanh toán', 'Đã hủy'].map((label, index) => {
                        return <li key={index} className={`mx-2 font-bold cursor-pointer border-neutral-950  ${tab == index ? 'border-b-2 text-neutral-950' : 'text-neutral-500'}`} onClick={() => setTab(index)}>{label}</li>
                    })}
                </ul>
                <Table columns={columns} data={getTableData} />
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" onClick={() => setIsOpenCreateForm(true)}>Thêm mới</button>
                <CreateBooking open={isOpenCreateForm} onClose={() => setIsOpenCreateForm(false)} />
            </div>
        </BookingContext.Provider>
    )
}

export default Booking