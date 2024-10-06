
import { createContext, useEffect, useMemo, useState } from 'react'
import axios from "axios";
import LabelBookingStatus from '../../../components/LabelBookingStatus';
import Table from '../../../components/Table'
import ButtonMore from './ButtonMore';
const columns = [
    {
        name: "Id đơn đặt",
        selector: (row) => row.orderId,
        sortable: true,
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
    },
    {
        name: "Ngày thanh toán",
        selector: (row) => row.paymentDate,
        sortable: true,
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

    const getTableData = useMemo(() => {
        const tableData = []
        listBookings.map(item => {
            const record = {
                orderId: item.id,
                customerName: item.customer.name,
                tourName: item.tour_day.tour.name,
                orderDate: item.order_date,
                paymentDate: item.pay_date,
                orderStatus: <LabelBookingStatus label={item.status.ele_name} statusCode={item.status.ele_id}/>,
            }

            tableData.push(record)
        }) 
        return tableData
    }, [listBookings])


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
            <Table columns={columns} data={getTableData} />
        </BookingContext.Provider>
    )
}

export default Booking