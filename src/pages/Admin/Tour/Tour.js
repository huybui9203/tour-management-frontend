import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Table from "../../../components/Table";
import ButtonMore from "./ButtonMore";
import CreateTour from "./CreateEditTour";
import ListDateStart from "./ListDateStart";
import ButtonView from "./ButtonView";
const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
    button: true,
    cell: (row) => <ButtonView id={row.id} label={row.id}/>
  },
  {
    name: "Tên tour",
    selector: (row) => row.name,
    sortable: true,
  },

  {
    name: "Ảnh",
    selector: (row) => row.img,
    cell: (row) => {
      return row.images?.length > 0? <img className="max-h-14 rounded-sm my-2" src={row.images[0].img_url.split(' ')[0]} alt={row.images[0].img_url}/> : 'no image'
    }
  },

  {
    name: "Số ngày",
    selector: (row) => row.totalDay,
    sortable: true,
  },
  {
    name: "Ngày khởi hành",
    selector: (row) => row.DateStart,
    sortable: true,
    cell: (row) => <ListDateStart listDateStart={row.listDateStart}/>,
  },

  {
    name: "Điểm đến",
    selector: (row) => row.destination,
    sortable: true,
  },

  {
    name: "Điểm khởi hành",
    selector: (row) => row.departurePoint,
    sortable: true,
  },

  {
    name: "Trạng thái",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => <div className={row.status ? 'text-green-500 font-bold' : 'font-bold' }>{row.status ? 'Hoạt động' : 'Dừng'}</div>,
  },

  {
    name: "Giá tour",
    selector: (row) => row.price,
    sortable: true,
  },

  {
    name: "More",
    button: true,
    cell: (row) => <ButtonMore id={row.id} />,
  },
];

export const TourContext = createContext();

const Tour = () => {
  const [listTours, setListTours] = useState([]);
  const [stale, setStale] = useState(false);
  const [tab, setTab] = useState(0);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)

  const getTableData = useMemo(() => {
    const tableData = [];
    listTours.map((item) => {
      if (item.status+1 == tab || tab == 0) {
        const record = {
            id: item.id,
            name: item.name,
            totalDay: item.total_day,
            listDateStart: item.date,
            destination: item.destination,
            departurePoint: item.departure_point,
            status: Number(item.status),
            price: item.price,
            images: item.images
        };
        tableData.push(record);
      }
    });
    return tableData;
  }, [listTours, tab]);

  useEffect(() => {
    const fetchListTours = async () => {
      const data = await axios
        .get(process.env.REACT_APP_URL + "/admin/tours", {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (!data) {
        return;
      }
      setListTours(data);
      if (stale) {
        setStale(false);
      }
    };

    fetchListTours();
  }, [stale]);

  return (
    <TourContext.Provider value={[setStale, listTours]}>
      <div className="relative">
        <ul className="flex absolute left-0 top-1">
          {["Tất cả", "Dừng hoạt động", "Đang hoạt động"].map((label, index) => {
            return (
              <li
                key={index}
                className={`mx-2 font-bold cursor-pointer border-neutral-950 ${
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
        </ul>
        <Table columns={columns} data={getTableData} />
        <button className="px-2 py-2 rounded-md bg-blue-600 mt-6 text-white" onClick={() => setIsOpenCreateForm(true)}>Thêm mới</button>
        <CreateTour open={isOpenCreateForm}
          onClose={() => setIsOpenCreateForm(false)}/>
      </div>
    </TourContext.Provider>
  );
};

export default Tour;
