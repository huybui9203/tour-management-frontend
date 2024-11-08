import { useState } from "react";

const Ltinerary = ({ tour }) => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="">
            {tour?.schedules
                ?.map((item) => (
                    <div key={item.id} className="cursor-pointer mb-1">
                        <h4
                            className="px-6 py-5 font-semibold rounded-sm transition-all duration-300 ease-in-out"
                            style={{ backgroundColor: "#f3f3f3", marginBottom: "10px" }}
                            onClick={() => toggleExpand(item.id)}
                        >
                            <span className="mr-3">{"Ngày " + item.day}</span>
                        </h4>

                        <div
                            className={`overflow-hidden text-justify transition-all duration-300 ease-in-out transform ${
                                expandedItems[item.id]
                                    ? "max-h-[500px] opacity-100 scale-y-100"
                                    : "max-h-0 opacity-0 scale-y-0"
                            }`}
                            style={{ transformOrigin: "top" }}
                        >
                            <p className="mb-4">{item.description}</p>
                        </div>
                    </div>
                ))
                .reverse()}
        </div>
    );
};

export default Ltinerary;
