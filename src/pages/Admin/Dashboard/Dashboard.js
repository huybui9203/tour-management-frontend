import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ChartRevenueMonthly from "./ChartRevenueMonthly";
Chart.register(CategoryScale);

function Dashboard() {
  const [monthRevenueData, setMonthRevenueData] = useState([]);
  const [monthYear, setMonthYear] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const getMonthlyRevenue = async () => {
      const data = await axios
        .get(
          process.env.REACT_APP_URL + "/admin/dashboard/getMonthlyRevenue2024",
          { withCredentials: true }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (!data) {
        return;
      }
      setMonthRevenueData(data);
      // if(stale) {
      //     setStale(false)
      // }
    };

    getMonthlyRevenue();
  }, []);

  return (
    <div className="">
      <ul className="flex">
        {["Doanh thu hàng tháng", "Chi tiết"].map((label, index) => {
          return (
            <li
              key={index}
              className={`mx-2 cursor-pointer font-bold border-neutral-950 ${
                tab == index
                  ? "border-b-2 text-neutral-950"
                  : "text-neutral-500"
              }`}
              onClick={() => setTab(index)}
            >
              {label}
            </li>
          );
        })}
      </ul>
      {tab == 0 ? (
        <div className="min-h-full">
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Bar
                data={{
                  labels: Array(12)
                    .fill("2024-")
                    .map(
                      (value, index) =>
                        value + (index + 1).toString().padStart(2, "0")
                    ),
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
                      data: Array(12)
                        .fill(0)
                        .map((value, index) => {
                          for (const item of monthRevenueData) {
                            if (item.monthNumber === index + 1) {
                              return item.totalRevenue;
                            }
                          }
                        }),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Doanh thu hàng tháng (VNĐ) năm 2024",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </main>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="flex items-center space-x-4 mb-4">
    <div className="flex flex-col">
      <label className="font-semibold mb-1">Tháng</label>
      <select
        value={monthYear.month}
        onChange={(e) =>
          setMonthYear((prev) => ({ ...prev, month: e.target.value }))
        }
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
      >
        {Array(12)
          .fill()
          .map((item, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
      </select>
    </div>
    <div className="flex flex-col">
      <label className="font-semibold mb-1">Năm</label>
      <select
        value={monthYear.year}
        onChange={(e) =>
          setMonthYear((prev) => ({ ...prev, year: e.target.value }))
        }
        className="p-2 border border-gray-300 rounded-md focus:outline-none scroll-t "
      >
        {Array(20)
          .fill()
          .map((item, index) => (
            <option key={index} value={new Date().getFullYear() - index}>
              {new Date().getFullYear() - index}
            </option>
          ))}
      </select>
    </div>
  </div>
  <ChartRevenueMonthly month={monthYear.month} year={monthYear.year} />
</div>

      )}
    </div>
  );
}

export default Dashboard;
