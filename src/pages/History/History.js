import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import LabelBookingStatus from "../../components/LabelBookingStatus";
import Table from "../../components/Table";
import { AuthContext } from "../../context/Auth";
import formatLocalDate from "../../utils/formatLocalDate";
import ButtonView from "./ButtonView";
import { Outlet } from "react-router-dom";
const columns = [
  {
    name: "Id đơn đặt",
    selector: (row) => row.orderId,
    sortable: true,
    button: true,
    // cell: (row) => <ButtonView orderId={row.orderId} label={row.orderId} />,
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
    cell: (row) => (
      <div>
        <p className="font-bold">{row.orderDate?.slice(0, 10)}</p>
        <p>{row.orderDate?.slice(11, 19)}</p>
      </div>
    ),
  },
  {
    name: "Ngày thanh toán",
    selector: (row) => row.paymentDate,
    sortable: true,
    cell: (row) => (
      <div>
        <p className="font-bold">{row.paymentDate?.slice(0, 10)}</p>
        <p>{row.paymentDate?.slice(11, 19)}</p>
      </div>
    ),
  },
  {
    name: "Trạng thái",
    selector: (row) => row.orderStatus(),
  },

  {
    name: "Chi tiết",
    // selector: (row) => row.orderStatus,

    button: true,
    cell: (row) => <ButtonView order={row.data} label={"Xem chi tiết"} />,
  },
];

export const HistoryContext = createContext();
function History() {
  const [stale, setStale] = useState(true);
  const [tab, setTab] = useState(0);
  const [histories, setHistories] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/order/get-history`,
      { withCredentials: true }
    );
    setHistories(res.data.list);
  };
  console.log(histories);
  useEffect(() => {
    if (!stale) {
      return;
    }
    fetchData().then(() => setStale(false));
  }, [stale]);

  const handleRefund = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5001/api/order/vnpay/refund",
        null,
        { withCredentials: true }
      );
      console.log("refund", result);
    } catch (error) {
      console.log(error);
    }
  };
  const getTableData = useMemo(() => {
    const tableData = [];
    histories.map((item) => {
      if (item.status_id == tab || tab == 0) {
        const record = {
          orderId: item.id,
          customerName: item.customer?.name,
          tourName: item.tour_day.tour?.name,
          orderDate: formatLocalDate(item.order_date),
          paymentDate: formatLocalDate(item.pay_date),
          data: item,
          orderStatus: () => {
            switch (item.status_id) {
              case 1:
                return (
                  <span className=" font-bold text-md text-orange-500">
                    Đang chờ xử lý
                  </span>
                );
              case 2:
                return (
                  <span className=" font-bold text-md text-green-500">
                    Đặt tour thành công
                  </span>
                );
              case 3:
                return (
                  <span className=" font-bold text-md text-red-500">
                    Đã hủy
                  </span>
                );

              default:
                break;
            }
          },
        };
        tableData.push(record);
      }
    });
    return tableData;
  }, [histories, tab]);
  return (
    <HistoryContext.Provider value={setStale}>
      <div className="relative my-8">
        <h1 className="absolute left-0 top-1 font-bold">Lịch sử đặt tour</h1>
        {/* <ul className="flex absolute left-0 top-1">
          {["Tất cả", "Đang chờ", "Đã thanh toán"].map((label, index) => {
            return (
              <li
                key={index}
                className={`mx-2 font-bold cursor-pointer border-neutral-950  ${
                  tab == index
                    ? "border-b-2 text-neutral-950"
                    : "text-neutral-500"
                }`}
                onClick={() => setTab(index)}
              >
                {label}
              </li>
            );
          })}
        </ul> */}
        <Table columns={columns} data={getTableData} />
      </div>
      <Outlet />
    </HistoryContext.Provider>
  );
}

export default History;
