import { useContext, useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import EditBookingStatus from "./EditBookingStatus";
import DeleteDialog from "../../../components/Dialog";
import axios from "axios";
import { BookingContext } from "./Booking";

const ButtonMore = ({
  orderId,
  options = [
    { type: "edit", label: "Cập nhật trạng thái" },
    { type: "delete", label: "Xóa" },
  ],
}) => {
  const [form, setForm] = useState({
    type: undefined,
    isOpen: false,
  });
  const reloadData = useContext(BookingContext)
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(process.env.REACT_APP_URL+'/admin/bookings/' + orderId, {
        withCredentials: true,
      })
      reloadData(true)
      alert('Đã xóa thành công!')
    } catch (error) {
      console.log(error)
      alert('Đã xảy ra lỗi!')
    }
    setForm((prev) => ({ ...prev, isOpen: false }))

  };
  return (
    <div>
       <div className="relative group">
        <button className="px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none">
          <FaEllipsisH className="text-gray-600" />
        </button>

        <ul className="w-[180px] group-hover:block hidden absolute bg-white shadow-lg rounded-lg right-0 bottom-[-100%] z-[20] overflow-hidden transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-4">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm 
                          ${index === 1 ? 'border-t border-gray-200 text-red-500' : ''}`}
              onClick={() => setForm({ type: option.type, isOpen: true })}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      {form.type === "edit" ? (
        <EditBookingStatus
          open={form.isOpen}
          orderId={orderId}
          onClose={() => setForm((prev) => ({ ...prev, isOpen: false }))}
        />
      ) : (
        <DeleteDialog
          msg={"Xác nhận xóa?"}
          open={form.isOpen}
          onClose={() => setForm((prev) => ({ ...prev, isOpen: false }))}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ButtonMore;
