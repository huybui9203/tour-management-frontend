import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { TourContext } from "./Tour";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const ButtonView = ({ id, label }) => {
  const [isShowView, setShowView] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [listDates, setListDate] = useState([]);
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState("");

  const [reloadData] = useContext(TourContext);

  const uploadImage = async (img) => {
    let imgURL;
    const fname = Date.now();
    const storageRef = ref(storage, `images/${fname}`);
    try {
      const result = await uploadBytes(storageRef, img);
      imgURL = await getDownloadURL(result.ref);
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi trong quá trình upload ảnh");
      return;
    }
    return `${imgURL} ${fname}`;
  };

  const upsertImage = async (img, oldImg) => {
    const imgURL = await uploadImage(img);
    const desertRef = ref(storage, `images/${oldImg}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      });
    return imgURL;
  };

  const fetchTour = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/admin/tours/" + id,
        { withCredentials: true }
      );

      const listDatesData = await axios.get(
        process.env.REACT_APP_URL + "/admin/tours/" + id + "/dates",
        { withCredentials: true }
      );

      if (res?.data) {
        setTourData(res.data);
      }
      if (listDatesData?.data) {
        setListDate(listDatesData.data);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
  };
  const handleView = async () => {
    setShowView(true);
    await fetchTour();
  };

  return (
    <div>
      <button
        className="text-blue-500 font-bold decoration-solid"
        onClick={handleView}
      >
        {"#" + label}
      </button>
      <Modal open={isShowView} onClose={() => setShowView(false)} size="m-xl">
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl max-h-screen overflow-auto">
          <h1 className="font-bold text-2xl text-gray-800 mb-4">
            Chi tiết tour #{id}
          </h1>
          {tourData && (
            <div className="space-y-2">
              <p className="text-base text-gray-600">
                Tên Tour:{" "}
                <span className="font-semibold text-gray-900">
                  {tourData.name}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Điểm khởi hành:{" "}
                <span className="font-semibold text-gray-900">
                  {tourData.departure_point}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Điểm đến:{" "}
                <span className="font-semibold text-gray-900">
                  {tourData.destination}
                </span>
              </p>
              {/* Ngày khởi hành và Ngày kết thúc song song */}
              <div className="flex space-x-4 flex-col">
                {/* Cột 1: Ngày khởi hành */}
                <div className="flex justify-between w-1/2">
                  <p className=" text-base text-gray-600 mb-1">
                    Ngày khởi hành
                  </p>
                </div>
                <ul style={{ margin: 0 }}>
                  {listDates.map((item, index) => (
                    <div className="flex justify-start items-center">
                      <button
                        disabled={tourData.schedules.length <= 0}
                        className="bg-red-500 text-white rounded-md px-1 mr-2"
                        onClick={async () => {
                          try {
                            await axios.delete(
                              process.env.REACT_APP_URL +
                                "/admin/tours/dates/" +
                                item.id,
                              { withCredentials: true }
                            );
                            await fetchTour();
                            reloadData(true);
                          } catch (error) {
                            alert("Đã xảy ra lỗi!");
                          }
                        }}
                      >
                        Xóa
                      </button>
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
              </div>
              <p className="text-base text-gray-600">
                Phương tiện:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData?.veh.ele_name}
                </span>
              </p>

              <p className="text-base text-gray-600">
                Số ngày:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData.total_day.slice(
                    0,
                    tourData.total_day.indexOf("N")
                  ) +
                    " ngày " +
                    tourData.total_day.slice(
                      tourData.total_day.indexOf("N") + 1,
                      -1
                    ) +
                    " đêm"}
                </span>
              </p>

              <p className="text-base text-gray-600">
                Số người tối đa:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData.number_of_guests}
                </span>
              </p>
              {/* <p className="text-base text-gray-600">Giá người lớn: <span className="font-semibold text-gray-900">{tourData.adultPrice}</span></p>
                        <p className="text-base text-gray-600">Giá trẻ em: <span className="font-semibold text-gray-900">{tourData.childPrice}</span></p> */}
              <p className="text-base text-gray-600">
                Khuyến mãi:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData.promo}%
                </span>
              </p>
              <p className="text-base text-gray-600">
                Trạng thái:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData.status ? "Đang hoạt động" : "Dừng hoạt động"}
                </span>
              </p>
              <p className="text-base text-gray-600">
                Mô tả:
                <span className="ml-1 font-semibold text-gray-900">
                  {tourData.description}
                </span>
              </p>

              <p className="text-base text-gray-600">Lịch trình:</p>
              <ul style={{ margin: 0 }}>
                {tourData.schedules
                  .map((item, index) => (
                    <div className="flex justify-start items-center">
                      <p className=" text-base text-gray-900 font-bold">
                        {"Ngày " + item.day}
                      </p>
                      <p className="mx-1 text-xs">:</p>
                      <p className=" text-base text-gray-900 font-bold">
                        {item.description}
                      </p>
                    </div>
                  ))
                  .reverse()}
              </ul>
              <div className="flex items-center">
                <button
                  disabled={tourData.schedules.length <= 0}
                  className="bg-red-500 text-white rounded-md px-2 py-1 mr-2"
                  onClick={async () => {
                    try {
                      await axios.delete(
                        process.env.REACT_APP_URL +
                          "/admin/tours/schedules/" +
                          tourData.schedules[0]?.id,
                        { withCredentials: true }
                      );
                      await fetchTour();
                      reloadData(true);
                    } catch (error) {
                      alert("Đã xảy ra lỗi!");
                    }
                  }}
                >
                  Xóa
                </button>
                <button
                  disabled={!description}
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                  onClick={async () => {
                    try {
                      await axios.post(
                        process.env.REACT_APP_URL +
                          "/admin/tours/" +
                          id +
                          "/schedule",
                        { day: tourData.schedules.length + 1, description },

                        { withCredentials: true }
                      );
                      await fetchTour();
                      reloadData(true);
                    } catch (error) {
                      alert("Đã xảy ra lỗi!");
                    }
                  }}
                >
                  Thêm lịch trình
                </button>

                <input
                  type="text"
                  name=""
                  id=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="lịch trình"
                  className="block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
              <div className="">
                <p className="text-base text-gray-600">
                  Ảnh:{" "}
                  {tourData.images.length <= 0 ? (
                    <span className="ml-1 font-semibold text-gray-900">
                      no image
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                {tourData.images &&
                  tourData.images.map((img, index) => {
                    return (
                      <div className="relative flex">
                        <img
                          className="my-2"
                          key={index}
                          src={img.img_url}
                          alt={img.img_url}
                        />
                        <button
                          className="absolute left-50 bg-red-500 text-white rounded-md px-2 py-2"
                          onClick={async () => {
                            try {
                              await axios.delete(
                                process.env.REACT_APP_URL +
                                  "/admin/tours/images/" +
                                  img.id,
                                { withCredentials: true }
                              );
                              await fetchTour();
                              reloadData(true);

                              const desertRef = ref(
                                storage,
                                `images/${img.img_url.split(" ")[1]}`
                              );
                              deleteObject(desertRef)
                                .then(() => {
                                  console.log("File deleted successfully");
                                })
                                .catch((error) => {
                                  console.log("Uh-oh, an error occurred!");
                                });
                            } catch (error) {
                              alert("Đã xảy ra lỗi!");
                            }
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    );
                  })}

                <button
                  disabled={!img}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 mt-4"
                  onClick={async () => {
                    if (!img) {
                      return;
                    }

                    const imgURL = await uploadImage(img);

                    if (!imgURL) {
                      return;
                    }

                    try {
                      await axios.post(
                        process.env.REACT_APP_URL +
                          "/admin/tours/" +
                          id +
                          "/images",
                        { imgURL },

                        { withCredentials: true }
                      );
                      await fetchTour();
                      reloadData(true);
                    } catch (error) {
                      alert("Đã xảy ra lỗi!");
                    }
                  }}
                >
                  Thêm ảnh
                </button>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ButtonView;
