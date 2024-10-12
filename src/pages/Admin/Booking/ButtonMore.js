import { useContext, useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import EditBookingStatus from "./EditBookingStatus";
import DeleteDialog from "../../../components/Dialog";
import axios from "axios";
import { BookingContext } from "./Booking";

const ButtonMore = ({
  orderId,
  options = [
    { type: "edit", label: "cập nhật trạng thái" },
    { type: "delete", label: "xóa" },
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
        <button className="px-1 py-1">
          <FaEllipsisH />
        </button>
        <ul className="w-[140px] group-hover:block hidden absolute bg-white shadow-lg rounded-xl right-3 bottom-3 z-[10] overflow-hidden">
          {options.map((option, index) => (
            <li
              key={index}
              className="h-[28px] pl-2 leading-[28px] hover:bg-gray-200"
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
          msg={"Xac nhan xoa?"}
          open={form.isOpen}
          onClose={() => setForm((prev) => ({ ...prev, isOpen: false }))}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ButtonMore;
