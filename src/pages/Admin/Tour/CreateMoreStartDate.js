import { useContext, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { TourContext } from "./Tour";
import axios from "axios";

const CreateMoreStartDate = ({ open, onClose, id }) => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [promo, setPromo] = useState(0)
  const [reloadData, listTours] = useContext(TourContext);
  
  const listDates = listTours.find((item) => item.id === id).date;
  const currTour = listTours.find((item) => item.id === id)

  console.log(listDates);

  const isValidDate = () => {
    return listDates.every((d) => {
      return (
        new Date(date.endDate) < new Date(d.start_date) ||
        new Date(date.startDate) > new Date(d.end_date)
      );
    });
  };
  const hanldeCreate = async () => {
    if (!date.startDate || !date.endDate) {
      alert("Vui lòng chọn đầy đủ ngày khởi hành và ngày kết thúc");
      return;
    }

    if (!isValidDate()) {
      alert("Ngày được chọn đã bị trùng");
      return;
    }

    if (new Date(date.startDate) < Date.now()) {
      alert("Ngày được chọn phải lớn hơn ngày hiện tại");
      return;
    }

    if (new Date(date.startDate) > new Date(date.endDate)) {
      alert("Ngày khởi hành không được lớn hơn ngày kết thúc");
      return;
    }
    if(promo && (promo < 0 || promo > 100)) {
      alert("Khuyến mãi có giá trị không hợp lệ");
      return;
    }
    try {
      await axios.post(
        process.env.REACT_APP_URL + "/admin/tours/" + id + "/dates",
        { ...date, id, remainSeats: currTour.number_of_guests, promo },
        {
          withCredentials: true,
        }
      );
      reloadData(true);
      alert("Thêm ngày thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto">
        <h1 className="font-bold text-xl text-gray-800 mb-4">
          Thêm ngày khởi hành
        </h1>
        <p className="my-2">Danh sách ngày khởi hành và ngày kết thúc:</p>
        <ul style={{ margin: 0 }}>
          {listDates.map((item, index) => (
            <div key={index} className="flex justify-start items-center">
              <p className=" text-base text-gray-900 font-bold">
                {item.start_date.slice(0, 10)}
              </p>
              <p className="mx-1 text-xs">đến</p>
              <p className=" text-base text-gray-900 font-bold">
                {item.end_date.slice(0, 10)}
              </p>
            </div>
          ))}
        </ul>
        <div className="flex flex-col space-y-4 mt-2">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Chọn ngày khởi hành <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              value={date.startDate}
              onChange={(e) =>
                setDate((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="block w-full rounded-md border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Chọn ngày kết thúc <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              value={date.endDate}
              onChange={(e) =>
                setDate((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="block w-full rounded-md border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Khuyến mãi
            </label>
            <input
              required
              type="number"
              value={promo}
              onChange={(e) =>
                setPromo(e.target.value)
              }
              className="block w-full rounded-md border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div></div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={hanldeCreate}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMoreStartDate;
