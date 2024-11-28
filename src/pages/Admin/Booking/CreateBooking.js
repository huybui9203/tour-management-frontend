import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { BookingContext } from "./Booking";
import formatPrice from "../../../utils/formatPrice";

const PROMO_FOR_CHILD = 50;
const CreateBooking = ({ open, onClose, id }) => {
  const [tourId, setTourId] = useState("");

  const [selectedTourId, setSelectedTourId] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [note, setNote] = useState('')
  const [custData, setCustData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [participants, setParticipants] = useState([]);
  const [participantData, setParticipant] = useState({
    name: "",
    sex: 0,
    birthday: "",
  });

  const [tourData, setTourData] = useState(null);
  const reloadData = useContext(BookingContext);

  const isValidatedForm = () => {
    if (
      !selectedTourId ||
      roomCount <= 0 ||
      custData.name == "" ||
      custData.address == "" ||
      custData.email == "" ||
      custData.phone == "" ||
      participants.length == 0
    ) {
      return false;
    }
    return true;
  };

  const selectedTour = tourData?.date?.find(
    (item) => item.id == selectedTourId
  );

  const handleCreate = async () => {
    console.log(selectedTourId, roomCount, custData, participants);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(custData.email)) {
      alert("email không hợp lệ");
      return;
    }

    if (custData.phone.length !== 10 || !custData.phone.startsWith("0")) {
      alert("Số điện thoại không hợp lệ");
      return;
    }


    const formData = {
      id: Number(selectedTourId),
      roomCount: Number(roomCount),
      customer: custData,
      participants,
      note
    };
    console.log(formData);

    try {
      await axios.post(
        process.env.REACT_APP_URL + "/admin/bookings",
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


  console.log(selectedTourId);
  const handleClose = () => {
    onClose();
    setCustData({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
    setParticipant({
      name: "",
      sex: 0,
      birthday: "",
    });
    setTourId("");
    setRoomCount(1);
    setParticipants([]);
    setNote('')
  };

  return (
    <Modal open={open} onClose={handleClose} size={"m-3xl"}>
      <div className=" p-4 max-h-screen overflow-auto min-w-60">
        {id ? (
          <h1 className="font-bold text-lg">Edit Account</h1>
        ) : (
          <h1 className="font-bold text-lg">Thêm mới Booking</h1>
        )}
        <p>Nhập mã tour:</p>
        <div className="flex items-center mb-1">
          <input
            type="number"
            // placeholder="tên"
            value={tourId}
            onChange={(e) => setTourId(e.target.value)}
            className="block w-40 rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            disabled={tourId == ""}
            className="px-1 py-1 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
            onClick={async () => {
              setParticipants([])
              try {
                const res = await axios.get(
                  process.env.REACT_APP_URL + "/admin/tours/" + tourId,
                  { withCredentials: true }
                );
                setTourData(res?.data);
              } catch (error) {
                alert("Đã xảy ra lỗi");
              }
            }}
          >
            Tìm tour
          </button>
        </div>
        <ul>
          {tourData?.date?.map((tour, index) => {
            return (
              <div key={index} className="flex justify-start items-center">
                <input
                  type="radio"
                  name="tour"
                  id=""
                  checked={selectedTourId == tour.id}
                  value={tour.id}
                  onChange={(e) => {
                    setSelectedTourId(e.target.value)
                    setParticipants([])
                  }}
                />
                <p className="ml-2 text-base text-gray-900 font-bold">
                  {tour.start_date.slice(0, 10)}
                </p>
                <p className="mx-1 text-xs">đến</p>
                <p className=" text-base text-gray-900 font-bold">
                  {tour.end_date.slice(0, 10)}
                </p>

                <p className=" text-base text-gray-900 ml-2">
                  Khuyến mãi: {Math.floor(tour.promo)}%
                </p>
                <p className=" text-base text-gray-900 ml-2">
                  Số chỗ còn: {tour.remain_seats}
                </p>
              </div>
            );
          })}
        </ul>
        <label htmlFor="">Số lượng phòng:</label>
        <input
          type="number"
          // placeholder="sđt"
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
          className="block w-40 rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>Nhập thông tin khách hàng</p>
        <div className="flex items-center">
          <div className="w-full mr-2">
            <label className="mt-2 block">Tên:</label>
            <input
              type="text"
              // placeholder="tên"
              value={custData.name}
              onChange={(e) =>
                setCustData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full">
            <label className="mt-2 block">Địa chỉ:</label>
            <input
              type="text"
              // placeholder="địa chỉ"
              value={custData.address}
              onChange={(e) =>
                setCustData((prev) => ({ ...prev, address: e.target.value }))
              }
              className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full mr-2">
            <label className="mt-2 block">Email:</label>
            <input
              type="text"
              // placeholder="email"
              value={custData.email}
              onChange={(e) =>
                setCustData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full">
            <label className="mt-2 block">Số điện thoại:</label>
            <input
              type="number"
              // placeholder="sđt"
              value={custData.phone}
              onChange={(e) =>
                setCustData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="border-t mt-4">
          <p className="mt-2">Nhập thông tin hành khách</p>
          <div className="flex items-center">
            <div className="w-full mr-2">
              <label className="mt-2 block">Họ tên:</label>
              <input
                type="text"
                // placeholder="tên"
                value={participantData.name}
                onChange={(e) =>
                  setParticipant((prev) => ({ ...prev, name: e.target.value }))
                }
                className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full">
              <label className="mt-2 block">Ngày sinh:</label>
              <input
                type="date"
                // placeholder="date of birth"
                value={participantData.birthday}
                onChange={(e) =>
                  setParticipant((prev) => ({
                    ...prev,
                    birthday: e.target.value,
                  }))
                }
                className="block w-full rounded-md mb-2 border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <label className="block mt-2">Giới tính:</label>
          <div className="flex items-center">
            <div className="mt-1">
              <input
                type="radio"
                id="admin"
                name="sex"
                value="0"
                checked={participantData.sex == 0}
                onChange={(e) =>
                  setParticipant((prev) => ({ ...prev, sex: e.target.value }))
                }
              />
              <label className=" mx-2" htmlFor="admin">
                Nam
              </label>
            </div>

            <div className="mt-1">
              <input
                type="radio"
                id="customer"
                name="sex"
                value="1"
                checked={participantData.sex == 1}
                onChange={(e) =>
                  setParticipant((prev) => ({ ...prev, sex: e.target.value }))
                }
              />
              <label className="ml-2" htmlFor="customer">
                Nữ
              </label>
            </div>
          </div>
          <button
            className="px-1 py-1 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
            disabled={
              participantData.name == "" || participantData.birthday == ""
            }
            onClick={() => {
              if (new Date().getFullYear() - participantData?.birthday?.slice(0, 4) <= 0) {
                alert("Ngày sinh không hợp lệ");
                return;
              }
              const priceForAdults = Math.floor(
                (tourData?.price * (100 - selectedTour?.promo)) / 100
              );
              const priceForChildren = Math.floor(
                (priceForAdults * PROMO_FOR_CHILD) / 100
              );
              let price
              if(new Date().getFullYear() - participantData?.birthday?.slice(0, 4) >=12) {
                price = priceForAdults
              } else {
                price = priceForChildren
              }
              setParticipants((prev) => [...prev, {...participantData, price}]);
              setParticipant({ name: "", sex: 0, birthday: "" });
            }}
          >
            Thêm hành khách
          </button>
        </div>

        <div className="border-t my-2">
          <p className="my-2 font-bold">Danh sách hành khách:</p>
          <ul>
            {participants.map((item, index) => {
              return (
                <li key={index}>
                  <span className="font-bold">{item.name}</span> -{" "}
                  {item.sex == 0 ? "Nam" : "Nữ"} - {item.birthday} -{" "}
                  {formatPrice(item.price)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t my-2">
          <h1 className="text-sm font-bold mt-2">GHI CHÚ</h1>
          <textarea
            placeholder="Vui lòng nhập nội dung ghi chú"
            className="text-sm mt-2 border w-full min-h-44 rounded-lg p-6 outline-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="text-right mb-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md min-w-8"
            onClick={handleClose}
          >
            Hủy
          </button>
          {id ? (
            <button
              className="px-2 ml-1 py-2 bg-blue-600 text-white rounded-md disabled:opacity-75"
              
            >
              Update
            </button>
          ) : (
            <button
              disabled={!isValidatedForm()}
              className="px-2 ml-1 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
              onClick={handleCreate}
            >
              Thêm booking
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateBooking;
