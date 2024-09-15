import { useState } from "react";

const Ltinerary = () => {
    // Giả định dữ liệu tĩnh cho các mục, sau này sẽ thay thế bằng dữ liệu từ API
    const data = [
        {
            id: 1,
            day: "Ngày 1",
            title: "Barcelona – Zaragoza – Madrid",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 2,
            day: "Ngày 2",
            title: "Barcelona – Zaragoza – Madrid",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
        },
        {
            id: 3,
            day: "Ngày 3",
            title: "Barcelona – Zaragoza – Madrid",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
        },
    ];

    // Tạo state để lưu trạng thái mở/đóng của từng mục
    const [expandedItems, setExpandedItems] = useState({});

    // Hàm toggle mở/đóng cho từng mục
    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="">
            {data.map((item) => (
                <div key={item.id} className="cursor-pointer mb-1">
                    <h4
                        className="px-6 py-5 font-semibold rounded-sm transition-all duration-300 ease-in-out"
                        style={{ backgroundColor: "#f3f3f3", marginBottom: "10px" }}
                        onClick={() => toggleExpand(item.id)}
                    >
                        <span className="mr-3">{item.day}</span>
                        {item.title}
                    </h4>

                    <div
                        className={`overflow-hidden text-justify transition-all duration-300 ease-in-out transform ${
                            expandedItems[item.id] ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
                        }`}
                        style={{ transformOrigin: 'top' }}
                    >
                        <p className="mb-4">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Ltinerary;
