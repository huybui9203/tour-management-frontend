import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { TourContext } from "./Tour";
import { VEH } from "../../../utils/constants";

const CreateEditTour = ({ open, onClose, id }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: 2,
  });

  const [reloadData, accountsData] = useContext(TourContext);

  useEffect(() => {
    if (id) {
      const account = accountsData.find((acc) => acc.id === id);
      setFormData({
        username: account.username,
        email: account.email,
        role: account.roleId,
      });
    }
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_URL + "/admin/accounts",
        formData,
        {
          withCredentials: true,
        }
      );
      reloadData(true);
      alert("Thêm mới thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
    onClose();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        process.env.REACT_APP_URL + "/admin/accounts/" + id,
        formData,
        {
          withCredentials: true,
        }
      );
      reloadData(true);
      alert("Sửa tài khoản thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className=" p-2">
        {id ? (
          <h1 className="font-bold text-lg">Edit Tour</h1>
        ) : (
          <h1 className="font-bold text-lg">Thêm mới Tour</h1>
        )}
        <input
          type="text"
          placeholder="name"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="flex">
          <input
            type="text"
            placeholder="Điểm khởi hành"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Điểm đến"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {!id && <div className="flex">
          <label>Ngày khởi hành</label>
          <input
            type="date"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label>Ngày kết thúc</label>
          <input
            type="date"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>}
        <select>
          <option value={VEH.NONE}>--Loại phương tiện--</option>
          <option value={VEH.PLANE}>Máy bay</option>
          <option value={VEH.BUS}>Xe ô tô</option>
        </select>
        <div className="flex">
          <input
            type="text"
            placeholder="Số ngày"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Số đêm"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <input
          type="text"
          placeholder="Số người tối đa"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex">
          <input
            type="text"
            placeholder="Giá người lớn"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Giá trẻ em"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <input
            type="text"
            placeholder="Khuyến mãi"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="flex">
          <label >Trạng thái</label>
           <input
            type="checkbox"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="block rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          </div>
        <textarea placeholder="Mô tả"/>
        <input type="file" multiple/>

        <button onClick={() => onClose()}>Hủy</button>
        {id ? (
          <button
            disabled={!formData.email || !formData.password}
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            disabled={!formData.email || !formData.password}
            onClick={handleCreate}
          >
            Thêm
          </button>
        )}
      </div>
    </Modal>
  );
};

export default CreateEditTour;
