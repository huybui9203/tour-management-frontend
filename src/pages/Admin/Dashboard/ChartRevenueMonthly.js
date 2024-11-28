import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import formatPrice from "../../../utils/formatPrice";
Chart.register(CategoryScale);

const ChartRevenueMonthly = ({ month, year }) => {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    custCount: 0,
    tourCount: 0,
    bookingCount: 0,
    totalAmount: 0
  })
  useEffect(() => {
    const getData = async () => {
      const data = await axios
        .get(process.env.REACT_APP_URL + "/admin/dashboard/getRevenue", {
          withCredentials: true,
          params: {
            m: month,
            y: year,
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (!data) {
        return;
      }
      setData(data);
    };

    getData();
  }, [month, year]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios
        .get(process.env.REACT_APP_URL + "/admin/dashboard/getRevenue", {
          withCredentials: true,
          params: {
            m: month,
            y: year,
            type: 'stat'
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (!data) {
        return;
      }
      setStatistics(prev => ({...prev, bookingCount: data[0].bookingCount, totalAmount: data[0].totalRevenue}));
    };

    getData();
  }, [month, year]);
  return (
    <div>
      <div className="flex">
        {/* <div className="mx-2">
          <h1>Tổng khách hàng</h1>
          <p>10</p>
        </div>
        <div className="mx-2">
          <h1>Tổng tour</h1>
          <p>10</p>
        </div> */}
        <div className="mx-2">
          <h1>Tổng đơn đặt tour</h1>
          <p>{statistics.bookingCount}</p>
        </div>
        <div className="mx-2">
          <h1>Tổng doanh thu</h1>
          <p>{formatPrice(statistics.totalAmount)} VNĐ</p>
        </div>
      </div>
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Bar
              data={{
                labels: data.map((item) => item.date),
                datasets: [
                  {
                    label: "Doanh thu (VNĐ)",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      "#c45850",
                    ],
                    data: data.map((item) => item.totalRevenue),
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: `Doanh thu tháng ${month} (VNĐ) năm ${year}`,
                  },
                  legend: {
                    display: false,
                  },
                },
                barThickness: 60,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartRevenueMonthly;
