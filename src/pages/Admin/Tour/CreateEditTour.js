import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { TourContext } from "./Tour";
import { VEH } from "../../../utils/constants";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const CreateEditTour = ({ open, onClose, id }) => {
  const [formData, setFormData] = useState({
    name: "",
    departurePoint: "",
    destination: "",
    veh: 0,
    countDay: "",
    coutNights: "",
    countGuess: "",
    adultsPrice: "",
    childrenPrice: "",
    promo: "",
    status: 1,
    description: "",
  });

  const [reloadData, toursData] = useContext(TourContext);

  useEffect(() => {
    if (id) {
      const tour = toursData.find((item) => item.id === id);
      setFormData({
        name: tour.name,
        departurePoint: tour.departure_point,
        destination: tour.destination,
        veh: tour.veh_id,
        countDay: tour.total_day.slice(0, tour.total_day.indexOf("N")),
        coutNights: tour.total_day.slice(tour.total_day.indexOf("N") + 1, -1),
        countGuess: tour.number_of_guests,
        adultsPrice: tour.price,
        childrenPrice: tour.price,
        promo: tour.promo,
        status: tour.status,
        description: tour.description,
      });
    }
  }, [open]);

  const handleCreate = async () => {
    if (!formData.name || !formData.departurePoint || !formData.destination) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (
      (formData.countDay && formData.countDay <= 0 )||
      (formData.coutNights && formData.coutNights <= 0) ||
      (formData.countGuess && formData.countGuess <= 0) ||
      (formData.adultsPrice && formData.adultsPrice <= 0) ||
      (formData.childrenPrice && formData.childrenPrice) < 0 ||
      (formData.promo && formData.promo) < 0
    ) {
      alert("Số phải lớn hơn 0");
      return;
    }

    if(formData.coutNights > formData.countDay) {
      alert("Số đêm không được lớn hơn số ngày");
      return;
    }

    if (
      !formData.countDay ||
      isNaN(formData.countDay) ||
      !formData.coutNights ||
      isNaN(formData.coutNights) ||
      !formData.countGuess ||
      isNaN(formData.countGuess) ||
      !formData.adultsPrice ||
      isNaN(formData.adultsPrice) ||
      !formData.childrenPrice ||
      isNaN(formData.childrenPrice) ||
      !formData.promo ||
      isNaN(formData.promo)
    ) {
      alert("Một số thông tin yêu cầu nhập số nhưng bạn đã nhập chuỗi");
      return;
    }

    if (formData.veh == 0) {
      alert("Vui lòng chọn loại phương tiện");
      return;
    }

    try {
      await axios.post(
        process.env.REACT_APP_URL + "/admin/tours",
        { ...formData },
        {
          withCredentials: true,
        }
      );
      reloadData(true);
      alert("Thêm mới thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }

    setFormData({
      name: "",
      departurePoint: "",
      destination: "",
      veh: 0,
      countDay: "",
      coutNights: "",
      countGuess: "",
      adultsPrice: "",
      childrenPrice: "",
      promo: "",
      status: 1,
      description: "",
    });
    onClose();
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.departurePoint || !formData.destination) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (
      (formData.countDay && formData.countDay <= 0 )||
      (formData.coutNights && formData.coutNights <= 0) ||
      (formData.countGuess && formData.countGuess <= 0) ||
      (formData.adultsPrice && formData.adultsPrice <= 0) ||
      (formData.childrenPrice && formData.childrenPrice) < 0 ||
      (formData.promo && formData.promo) < 0
    ) {
      alert("Số phải lớn hơn 0");
      return;
    }

    if(formData.coutNights > formData.countDay) {
      alert("Số đêm không được lớn hơn số ngày");
      return;
    }

    if (
      !formData.countDay ||
      isNaN(formData.countDay) ||
      !formData.coutNights ||
      isNaN(formData.coutNights) ||
      !formData.countGuess ||
      isNaN(formData.countGuess) ||
      !formData.adultsPrice ||
      isNaN(formData.adultsPrice) ||
      !formData.childrenPrice ||
      isNaN(formData.childrenPrice) ||
      !formData.promo ||
      isNaN(formData.promo)
    ) {
      alert("Một số thông tin yêu cầu nhập số nhưng bạn đã nhập chuỗi");
      return;
    }

    if (formData.veh == 0) {
      alert("Vui lòng chọn loại phương tiện");
      return;
    }

    try {
      await axios.put(
        process.env.REACT_APP_URL + "/admin/tours/" + id,
        { ...formData },
        {
          withCredentials: true,
        }
      );
      reloadData(true);
      alert("Sửa tour thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} size="m-2xl">
      <div className="max-h-screen w-full overflow-y-auto p-4 bg-white">
        {id ? (
          <h1 className="font-bold text-lg mb-4">Edit Tour</h1>
        ) : (
          <h1 className="font-bold text-lg mb-4">Thêm mới Tour</h1>
        )}

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Điểm khởi hành"
            value={formData.departurePoint}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                departurePoint: e.target.value,
              }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Điểm đến"
            value={formData.destination}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, destination: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <select
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, veh: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value={VEH.NONE}>--Loại phương tiện--</option>
          <option value={VEH.PLANE}>Máy bay</option>
          <option value={VEH.BUS}>Xe ô tô</option>
        </select>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Số ngày"
            value={formData.countDay}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, countDay: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Số đêm"
            value={formData.coutNights}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, coutNights: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <input
          type="text"
          placeholder="Số người tối đa"
          value={formData.countGuess}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, countGuess: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Giá người lớn"
            value={formData.adultsPrice}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, adultsPrice: e.target.value }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Giá trẻ em"
            value={formData.childrenPrice}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                childrenPrice: e.target.value,
              }))
            }
            className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <input
          type="text"
          placeholder="Khuyến mãi"
          value={formData.promo}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, promo: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex items-center my-2">
          <label className="mr-2">Hoạt động</label>
          <input
            type="checkbox"
            checked={formData.status == 1}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                status: prev.status == 1 ? 0 : 1,
              }));
            }}
            className="rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>

        <textarea
          placeholder="Mô tả"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="block w-full rounded-md my-2 border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-red-500 text-white rounded-md px-4 py-2"
          >
            Hủy
          </button>
          {id ? (
            <button
              // disabled={!formData.email || !formData.password}
              onClick={handleUpdate}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Update
            </button>
          ) : (
            <button
              // disabled={!formData.email || !formData.password}
              onClick={handleCreate}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
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
