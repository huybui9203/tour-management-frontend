import BookingPanel from "../../components/BookingPanel/BookingPanel";
import Slider from "../../components/Slider/Slider";
import Ltinerary from "../../components/Ltinerary/Ltinerary";
import InfomationTour from "../../components/InformationTour/Information";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
    const { title } = useParams();
    const [tour, setTour] = useState({});
    const [tourRelated, setTourRelated] = useState([]);
    const [selectedDayId, setSelectedDayId] = useState(-1)

    
    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/tour/get-details/${title}`);
        if (res.status !== 200) {
            console.log(res.data.message);
            return;
        }
        // setLoading(false);
        setTour(res.data.tour);
        setTourRelated(res.data.listTourRelated);
    };
    // console.log(tourdayID);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex justify-center flex-col">
            <h1 className="font-bold text-3xl py-4">{tour.name}</h1>
            <div className="block lg:flex">
                <div className="w-full lg:w-3/5 mr-8">
                    <Slider listImages={tour.images || []}/>
                    <h1 className="text-center font-bold text-3xl py-4">Lịch khởi hành</h1>
                    <InfomationTour tour={tour} selectedDayId={setSelectedDayId}/>
                    <h1 className="text-center font-bold text-3xl py-4">Lịch trình</h1>
                    <Ltinerary tour={tour} />
                </div>
                <BookingPanel tour={tour} dayId={selectedDayId}/>
            </div>
        </div>
    );
};

export default TourDetail;
