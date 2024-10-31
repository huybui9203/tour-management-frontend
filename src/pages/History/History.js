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
    return <div>History</div>;
}

export default History;
