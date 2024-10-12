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
    <Modal open={open} onClose={onClose} size="m-2xl" >
        <div className="max-h-screen w-full overflow-y-auto p-4 bg-white">
      {id ? (
        <h1 className="font-bold text-lg mb-4">Edit Tour</h1>
      ) : (
        <h1 className="font-bold text-lg mb-4">Thêm mới Tour</h1>
      )}
      
      <input
        type="text"
        placeholder="Name"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Điểm khởi hành"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="text"
          placeholder="Điểm đến"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      {!id && (
        <div className="flex space-x-2">
          <div className="flex flex-col w-1/2">
            <label className="">Ngày khởi hành</label>
            <input
              type="date"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="">Ngày kết thúc</label>
            <input
              type="date"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      )}

      <select className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option value={VEH.NONE}>--Loại phương tiện--</option>
        <option value={VEH.PLANE}>Máy bay</option>
        <option value={VEH.BUS}>Xe ô tô</option>
      </select>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Số ngày"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="text"
          placeholder="Số đêm"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <input
        type="text"
        placeholder="Số người tối đa"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Giá người lớn"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="text"
          placeholder="Giá trẻ em"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <input
        type="text"
        placeholder="Khuyến mãi"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <div className="flex items-center my-2">
        <label className="mr-2">Trạng thái</label>
        <input
          type="checkbox"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>

      <textarea placeholder="Mô tả" className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

      <input type="file" multiple className="my-2" />

      <div className="flex justify-between mt-4">
        <button onClick={() => onClose()} className="bg-red-500 text-white rounded-md px-4 py-2">Hủy</button>
        {id ? (
          <button
            disabled={!formData.email || !formData.password}
            onClick={handleUpdate}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Update
          </button>
        ) : (
          <button
            disabled={!formData.email || !formData.password}
            onClick={handleCreate}
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Thêm
          </button>
        )}
      </div>
        </div>

    </Modal>
  );
};

export default CreateEditTour;
