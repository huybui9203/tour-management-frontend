import { useState } from "react";
import formatDate from "../../utils/formatDate";
import { PROMO_FOR_CHILD } from "../../utils/constants";
import formatPrice from "../../utils/formatPrice";

export default function Information({ tour, selectedDayId = () => {} }) {
  const [selectedMonth, setSelectedMonth] = useState("09/2024");
  const [selectedDay, setSelectedDay] = useState(null);
  const listDate = tour.date
    ? tour.date.map((item) => ({
        date:
          item.start_date.slice(5, 7) +
          "/" +
          item.start_date.slice(8, 10) +
          "/" +
          item.start_date.slice(0, 4),
        id: item.id,
        promo: item.promo,
        startDate: item.start_date,
        endDate: item.end_date,
      }))
    : [];
  const months = Array.from(
    new Set(
      listDate
        .map((item) => item.date?.slice(0, 2) + item.date?.slice(5))
        .sort()
    )
  );

  const today = new Date(); // Lấy ngày hiện tại
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1; // Tháng bắt đầu từ 0
  const todayYear = today.getFullYear();

  // Thông tin cho các ngày đã cài đặt

  const availableDays = (month) => {
    return listDate
      .filter((item) => item.date?.slice(0, 2) == month)
      .map((item) => ({
        day: item.date?.slice(3, 5).startsWith("0")
          ? item.date?.slice(4, 5)
          : item.date?.slice(3, 5),
        id: item.id,
        promo: item?.promo,
        startDate: item.startDate,
        endDate: item.endDate,
      }));
  };

  const currTourDay = availableDays(selectedMonth.slice(0, 2))?.find(item=>item.day==selectedDay)
  const priceAfterPromo = Math.floor(tour?.price * (100 - currTourDay?.promo)/ 100)
  const priceForChildren = Math.floor(priceAfterPromo * (100 - PROMO_FOR_CHILD)/ 100)
  console.log('tourday',selectedDay, selectedMonth, currTourDay)
  // Danh sách ngày có thông tin
  const getDaysInMonth = (monthYear) => {
    const [month, year] = monthYear.split("/");
    const date = new Date(year, month, 0);
    const daysArray = [];
    for (let day = 1; day <= date.getDate(); day++) {
      daysArray.push(day);
    }
    return daysArray;
  };

  const daysInSelectedMonth = getDaysInMonth(selectedMonth);
  

  // Hàm để thay đổi tháng
  const changeMonth = (direction) => {
    const [month, year] = selectedMonth.split("/").map(Number);
    if (direction === "next") {
      if (month === 12) {
        setSelectedMonth(`1/${year + 1}`);
      } else {
        setSelectedMonth(`${month + 1}/${year}`);
      }
    } else {
      if (month === 1) {
        setSelectedMonth(`12/${year - 1}`);
      } else {
        setSelectedMonth(`${month - 1}/${year}`);
      }
    }
    setSelectedDay(null); // Reset ngày đã chọn
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-4xl mx-auto">
      {/* Chọn tháng */}
      <div className="w-full md:w-40 bg-white shadow-lg border-2 border-gray-100 rounded-lg p-4 transition-all">
        <h2 className="font-serif font-bold text-lg mb-4 text-teal-600 text-center">
          CHỌN THÁNG
        </h2>
        <div className="space-y-2">
          {months.map((month) => (
            <button
              key={month}
              className={`w-full py-2 px-4 rounded-md text-center text-lg font-semibold transition-all ${
                selectedMonth === month
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedMonth(month);
                setSelectedDay(null); // Reset ngày đã chọn
              }}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Hiển thị lịch các ngày trong tháng hoặc thông tin cho ngày đã chọn */}
      <div className="w-full bg-white shadow-lg border-2 border-gray-100 rounded-lg p-4 transition-all">
        {selectedDay ? (
          // Hiển thị thông tin PHƯƠNG TIỆN DI CHUYỂN và GIÁ TOUR khi chọn ngày
          <div>
            <h2 className="font-serif font-bold text-2xl text-teal-600 mb-4 text-center">
              PHƯƠNG TIỆN DI CHUYỂN
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
              <div className="md:border-r border-gray-300 pr-4">
                <p className="font-semibold text-black text-rose-600">
                  Ngày đi: {formatDate(currTourDay?.startDate)}
                </p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>
                    {new Date(currTourDay?.startDate)
                      .toTimeString()
                      .slice(0, 5) || "N/A"}
                  </span>
                  {/* <span>
                    {new Date(currTourDay?.endDate)
                      .toTimeString()
                      .slice(0, 5) || "N/A"}
                  </span> */}
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex-1 border-t border-gray-300 relative">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      &rarr;
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-gray-700">
                  <span>{tour.departure_point || "N/A"}</span>
                  <span>{tour.destination || "N/A"}</span>
                </div>
              </div>
              <div className="md:pl-4">
                <p className="font-semibold text-black text-rose-600">
                  Ngày về: {formatDate(currTourDay?.endDate)}
                </p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>
                    {new Date(tour.date[0]?.end_date)
                      .toTimeString()
                      .slice(0, 5) || "N/A"}
                  </span>
                  {/* <span>
                    {new Date(tour.date[0]?.start_date)
                      .toTimeString()
                      .slice(0, 5) || "N/A"}
                  </span> */}
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex-1 border-t border-gray-300 relative">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      &rarr;
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-gray-700">
                  <span>{tour.destination || "N/A"}</span>
                  <span>{tour.departure_point || "N/A"}</span>
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-300" />
            <h2 className="font-serif font-bold text-2xl text-teal-600 mb-4 text-center">
              GIÁ TOUR
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="md:border-r border-gray-300 pr-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Người lớn</p>
                    <p className="font-bold text-red-600">
                      {formatPrice(priceAfterPromo) + ' đ' || "N/A"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 12 tuổi trở lên)</p>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Trẻ em</p>
                    <p className="font-bold text-red-600">
                      {formatPrice(priceForChildren) + ' đ' || "N/A"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 2 - 11 tuổi)</p>
                </div>
                {/* <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Trẻ nhỏ</p>
                    <p className="font-bold text-red-600">
                      {tour.price || "N/A"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 2 - 4 tuổi)</p>
                </div> */}
              </div>
              <div className="md:pl-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Em bé</p>
                    <p className="font-bold text-red-600">
                      Miễn phí
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">(Dưới 2 tuổi)</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <button
                className="text-teal-600 hover:text-teal-800"
                onClick={() => changeMonth("previous")}
              >
                &lt; Previous
              </button>
              <h2 className="font-serif font-bold text-2xl text-teal-600 text-center">
                Tháng {selectedMonth}
              </h2>
              <button
                className="text-teal-600 hover:text-teal-800"
                onClick={() => changeMonth("next")}
              >
                Next &gt;
              </button>
            </div>

            {/* Hiển thị các ký hiệu từ T2 đến CN */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayLabel) => (
                <div key={dayLabel} className="font-semibold">
                  {dayLabel}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysInSelectedMonth.map((day, index) => {
                const date = new Date(
                  todayYear,
                  parseInt(selectedMonth.split("/")[0]) - 1,
                  day
                );
                const dayOfWeek = date.getDay(); // Lấy ngày trong tuần
                const isPast =
                  (selectedMonth.split("/")[0] == todayMonth &&
                    day < todayDate) ||
                  selectedMonth.split("/")[0] < todayMonth;
                const availableDay = availableDays(
                  selectedMonth.slice(0, 2)
                ).find((item) => item.day == day.toString());

                const promo = availableDays(
                  selectedMonth.slice(0, 2)
                ).find((item) => item.day == day.toString())?.promo;

                return (
                  <div
                    className={`flex flex-col items-center p-2 border rounded transition ${
                      isPast
                        ? "bg-gray-300 text-gray-600 cursor-default"
                        : availableDay
                        ? "hover:bg-teal-200"
                        : "bg-gray-200 cursor-default"
                    }`}
                    key={index}
                    onClick={() => {
                      !isPast && availableDay && setSelectedDay(day);
                      availableDay && selectedDayId(availableDay.id);
                    }} // Di chuyển logic onClick ra ngoài
                    style={{
                      cursor: isPast || !availableDay ? "default" : "pointer",
                    }} // Thay đổi con trỏ nếu không khả dụng
                  >
                    <div className="relative w-full py-2 text-lg font-semibold text-center">
                      {day}
                      {promo > 0 && <span className="absolute top-[-8px] left-[-8px] text-xs text-white bg-red-500 px-0.5">KM {promo}%</span>}
                    </div>
                    {availableDay && (
                      <span className="text-sm text-red-600 mt-1">
                        {Math.floor(tour.price *(100- promo)/ 100)} {/* Hiển thị giá cho người lớn */}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ghi chú thêm */}
            <p className="mt-4 text-center text-red-500 italic">
              Vui lòng chọn ngày phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
