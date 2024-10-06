import { useState } from 'react';

export default function Information() {
  const [selectedMonth, setSelectedMonth] = useState('9/2024');
  const [selectedDay, setSelectedDay] = useState(null);
  
  const months = ['9/2024', '10/2024', '11/2024', '12/2024'];
  const today = new Date(); // Lấy ngày hiện tại
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1; // Tháng bắt đầu từ 0
  const todayYear = today.getFullYear();

  // Thông tin cho các ngày đã cài đặt
  const availableDays = ['21', '22', '23']; // Danh sách ngày có thông tin

  const getDaysInMonth = (monthYear) => {
    const [month, year] = monthYear.split('/');
    const date = new Date(year, month, 0);
    const daysArray = [];
    for (let day = 1; day <= date.getDate(); day++) {
      daysArray.push(day);
    }
    return daysArray;
  }

  const daysInSelectedMonth = getDaysInMonth(selectedMonth);

  // Thông tin cho ngày đã chọn
  const travelInfo = {
    '21': {
      transportation: {
        depart: {
          time: '06:00',
          from: 'Cần Thơ',
          to: 'Chợ Nổi Cái Răng',
        },
        return: {
          time: '00:00',
          from: 'Chợ Nổi Cái Răng',
          to: 'Cần Thơ',
        },
      },
      price: {
        adult: '690,000 đ',
        child: '690,000 đ',
        infant: '0 đ',
        baby: '0 đ',
      },
    },
    '22': {
        transportation: {
            depart: {
              time: '06:00',
              from: 'Hà Nội',
              to: 'Đồ Sơn-Hải Phòng',
            },
            return: {
              time: '19:00',
              from: 'Hải Phòng',
              to: 'Hà Nội',
            },
          },
      price: {
        adult: '790,000 đ',
        child: '690,000 đ',
        infant: '0 đ',
        baby: '0 đ',
      },
    },
    '23': {
        transportation: {
            depart: {
              time: '09:00',
              from: 'Nam Định',
              to: 'Tam Đảo- Vĩnh Phúc',
            },
            return: {
              time: '20:00',
              from: 'Tam Đảo- Vĩnh Phúc',
              to: 'Nam Định',
            },
          },
      price: {
        adult: '990,000 đ',
        child: '790,000 đ',
        infant: '0 đ',
        baby: '0 đ',
      },
    },
  };

  // Hàm để thay đổi tháng
  const changeMonth = (direction) => {
    const [month, year] = selectedMonth.split('/').map(Number);
    if (direction === 'next') {
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
        <h2 className="font-serif font-bold text-lg mb-4 text-teal-600 text-center">CHỌN THÁNG</h2>
        <div className="space-y-2">
          {months.map((month) => (
            <button
              key={month}
              className={`w-full py-2 px-4 rounded-md text-center text-lg font-semibold transition-all ${
                selectedMonth === month ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
            <h2 className="font-serif font-bold text-2xl text-teal-600 mb-4 text-center">PHƯƠNG TIỆN DI CHUYỂN</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
              <div className="md:border-r border-gray-300 pr-4">
                <p className="font-semibold text-black text-rose-600">Ngày đi - {selectedDay}/{selectedMonth}</p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>{travelInfo[selectedDay]?.transportation?.depart.time || 'N/A'}</span>
                  <span>{travelInfo[selectedDay]?.transportation?.return.time || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex-1 border-t border-gray-300 relative">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      &rarr;
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-gray-700">
                  <span>{travelInfo[selectedDay]?.transportation?.depart.from || 'N/A'}</span>
                  <span>{travelInfo[selectedDay]?.transportation?.depart.to || 'N/A'}</span>
                </div>
              </div>
              <div className="md:pl-4">
                <p className="font-semibold text-black text-rose-600">Ngày về - {selectedDay}/{selectedMonth}</p>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>{travelInfo[selectedDay]?.transportation?.return.time || 'N/A'}</span>
                  <span>{travelInfo[selectedDay]?.transportation?.depart.time || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex-1 border-t border-gray-300 relative">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      &rarr;
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-gray-700">
                  <span>{travelInfo[selectedDay]?.transportation?.return.from || 'N/A'}</span>
                  <span>{travelInfo[selectedDay]?.transportation?.return.to || 'N/A'}</span>
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-300" />
            <h2 className="font-serif font-bold text-2xl text-teal-600 mb-4 text-center">GIÁ TOUR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="md:border-r border-gray-300 pr-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Người lớn</p>
                    <p className="font-bold text-red-600">{travelInfo[selectedDay]?.price.adult || 'N/A'}</p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 12 tuổi trở lên)</p>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Trẻ em</p>
                    <p className="font-bold text-red-600">{travelInfo[selectedDay]?.price.child || 'N/A'}</p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 5 - 11 tuổi)</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Trẻ nhỏ</p>
                    <p className="font-bold text-red-600">{travelInfo[selectedDay]?.price.infant || 'N/A'}</p>
                  </div>
                  <p className="text-sm text-gray-500">(Từ 2 - 4 tuổi)</p>
                </div>
              </div>
              <div className="md:pl-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Em bé</p>
                    <p className="font-bold text-red-600">{travelInfo[selectedDay]?.price.baby || 'N/A'}</p>
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
                onClick={() => changeMonth('previous')}
              >
                &lt; Previous
              </button>
              <h2 className="font-serif font-bold text-2xl text-teal-600 text-center">
                Tháng {selectedMonth}
              </h2>
              <button
                className="text-teal-600 hover:text-teal-800"
                onClick={() => changeMonth('next')}
              >
                Next &gt;
              </button>
            </div>

            {/* Hiển thị các ký hiệu từ T2 đến CN */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((dayLabel) => (
                <div key={dayLabel} className="font-semibold">
                  {dayLabel}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysInSelectedMonth.map((day) => {
                const date = new Date(todayYear, parseInt(selectedMonth.split('/')[0]) - 1, day);
                const dayOfWeek = date.getDay(); // Lấy ngày trong tuần
                const isPast =
                  (selectedMonth.split('/')[0] == todayMonth && day < todayDate) ||
                  selectedMonth.split('/')[0] < todayMonth;
                const isAvailable = availableDays.includes(day.toString());

                return (
                    <div
                    className={`flex flex-col items-center p-2 border rounded transition ${
                      isPast
                        ? 'bg-gray-300 text-gray-600 cursor-default'
                        : isAvailable
                        ? 'hover:bg-teal-200'
                        : 'bg-gray-200 cursor-default'
                    }`}
                    key={day}
                    onClick={() => !isPast && isAvailable && setSelectedDay(day)} // Di chuyển logic onClick ra ngoài
                    style={{ cursor: isPast || !isAvailable ? 'default' : 'pointer' }} // Thay đổi con trỏ nếu không khả dụng
                  >
                    <div className="w-full py-2 text-lg font-semibold text-center">
                      {day}
                    </div>
                    {isAvailable && (
                      <span className="text-sm text-red-600 mt-1">
                        {travelInfo[day].price.adult} {/* Hiển thị giá cho người lớn */}
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
