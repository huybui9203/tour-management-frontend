import BookingPanel from "../../components/BookingPanel/BookingPanel";
import Slider from "../../components/Slider/Slider";
import Ltinerary from "../../components/Ltinerary/Ltinerary";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
    const { title } = useParams();
    const [tour, setTour] = useState({});
    const [tourRelated, setTourRelated] = useState([]);
    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/tour/get-details/${title}`);
        if (res.status !== 200) {
            console.log(res.data.message);
            return;
        }
        setTour(res.data.tour);
        setTourRelated(res.data.listTourRelated);
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(tour, tourRelated);

    return (
        <div className="flex justify-center flex-col">
            <h1 className="font-bold text-3xl py-4">{tour.name}</h1>
            <div className="block lg:flex">
                <div className="w-full lg:w-3/5 mr-8">
                    <Slider />
                    <h1 className="text-center font-bold text-3xl py-4">Lịch khởi hành</h1>
                    <h1 className="text-center font-bold text-3xl py-4">Lịch trình</h1>
                    <Ltinerary tour={tour} />
                </div>
                <BookingPanel tour={tour} />
            </div>
        </div>
    );
};

export default TourDetail;
