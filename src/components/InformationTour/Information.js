import { useState } from "react";
import formatDate from "../../utils/formatDate";

export default function Information({ tour, tourdayID, handleSetTourDay }) {
    const [listMonths, setListMonths] = useState(() => {
        return (
            tour &&
            tour.map((element) => {
                const date = new Date(element.start_date);
                return { month: date.getMonth() + 1, year: date.getFullYear() };
            })
        );
    });
    const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
    console.log("t", tourdayID);

    return (
        <div className="grid grid-cols-6 gap-2">
            <div className="col-span-1">
                {listMonths.map((item) => (
                    <div
                        key={item.month}
                        className={`flex items-center justify-center border py-3 rounded-md cursor-pointer select-none ${
                            monthSelected === item.month ? "bg-blue-500" : "bg-gray-400"
                        }`}
                        onClick={() => setMonthSelected(item.month)}
                    >
                        <h1>
                            {item.month}/{item.year}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="col-span-5 border border-blue-300 p-3 rounded-md">
                <h1 className="text-center text-sm my-3">Danh sách ngày khởi hành</h1>
                {tour &&
                    tour.map((item) => {
                        console.log(new Date(item.start_date).getMonth());

                        if (new Date(item.start_date).getMonth() + 1 === monthSelected) {
                            return (
                                <div
                                    key={item.id}
                                    className={`cursor-pointer py-3 rounded-md ${
                                        tourdayID === item.id ? "bg-gray-300" : ""
                                    } `}
                                    onClick={() => handleSetTourDay(item.id)}
                                >
                                    <div className="flex items-center justify-center  gap-3">
                                        <h1 className="font-semibold">Khởi hành: {formatDate(item.start_date)}</h1>
                                        <span className="font-semibold">{"===>"}</span>
                                        <h1 className="font-semibold">Kết thúc: {formatDate(item.end_date)}</h1>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
}
