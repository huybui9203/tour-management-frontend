import axios from "axios";
import React, { useEffect, useState } from "react";

function History() {
    const [histories, setHistories] = useState([]);
    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/order/get-history`, { withCredentials: true });
        setHistories(res.data.list);
    };
    console.log(histories);
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {histories.map((item) => {
                let status;
                if (item.status_id === 1) status = "PENDING";
                else if (item.status_id === 2) status = "COMPLETED";
                else status = "CANCELED";
                return (
                    <div className="py-10">
                        ID đơn hàng: {item.id} - Status: {status}
                    </div>
                );
            })}
        </div>
    );
}

export default History;
