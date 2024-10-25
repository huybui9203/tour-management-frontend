import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { AccountContext } from "./Account";

const CreateEditAccount = ({ open, onClose, id }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: 2,
  });
  const [reloadData, accountsData] = useContext(AccountContext);

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
    if (!formData.username || formData.username.length < 3) {
      alert("username phải ít nhất 3 ký tự");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      alert("email không hợp lệ");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      alert("password ít nhất 6 ký tự");
      return;
    }

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
    setFormData({ username: "", email: "", password: "", role: 2 });
    onClose();
  };

  const handleUpdate = async () => {
    if (!formData.username || formData.username.length < 3) {
      alert("username phải ít nhất 3 ký tự");
      return;
    }

  
    try {
      await axios.put(
        process.env.REACT_APP_URL + "/admin/accounts/" + id,
        { username: formData.username, role: formData.role },
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
          <h1 className="font-bold text-lg">Edit Account</h1>
        ) : (
          <h1 className="font-bold text-lg">Thêm mới Account</h1>
        )}
        <label className="mt-2 block">Username</label>
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {!id && (
          <>
            <label>Email</label>{" "}
            <input
              type="text"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="block w-full rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </>
        )}

        {!id && (
          <>
            <label className="block mb-2">Password</label>{" "}
            <input
              type="text"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="block w-full rounded-md  border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </>
        )}

        <label className="block mt-2">Quyền</label>
        <div className="mt-1">
          <input
            type="radio"
            id="admin"
            name="role"
            value="1"
            checked={formData.role == 1}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
          />
          <label className=" mx-2" htmlFor="admin">
            Admin
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="customer"
            name="role"
            value="2"
            checked={formData.role == 2}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
          />
          <label className="ml-2" htmlFor="customer">
            User
          </label>
        </div>
        <div className="text-right">
          <button
            className="px-2 py-2 bg-gray-400 text-white rounded-md min-w-8"
            onClick={() => onClose()}
          >
            Hủy
          </button>
          {id ? (
            <button
              className="px-2 ml-1 py-2 bg-blue-600 text-white rounded-md disabled:opacity-75"
              disabled={!formData.username}
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className="px-2 ml-1 py-2 bg-blue-600 text-white rounded-md disabled:opacity-75"
              disabled={!formData.email || !formData.password}
              onClick={handleCreate}
            >
              Thêm
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateEditAccount;
