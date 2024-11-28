import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";
import DestinationItem from "./DestinationItem";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [listNewTours, setListNewTours] = useState([])
    const [listDiscountTours, setListDiscountTours] = useState([])
    useEffect(() => {
        const fetchListNewTours = async () => {
            try {
                const res = await axios
                .get(process.env.REACT_APP_URL + "/tour/new", {
                    withCredentials: true,
                })
                setListNewTours(res.data)
            } catch (error) {
                alert('Đã xảy ra lỗi')
            }
        };

        fetchListNewTours();
    }, []);

    useEffect(() => {
        const fetchListDiscountTours = async () => {
            try {
                const res = await axios
                .get(process.env.REACT_APP_URL + "/tour/discount", {
                    withCredentials: true,
                })
                setListDiscountTours(res.data)
            } catch (error) {
                alert('Đã xảy ra lỗi')
            }
        };

        fetchListDiscountTours();
    }, []);
    return (
        <>
            {/* <div className="block sm:grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-4 gap-3 w-full mt-5 h-screen">
                <div className="col-span-2 row-span-2 rounded-md overflow-hidden cursor-pointer group">
                    <DestinationItem
                        img={"https://media.travel.com.vn/destination/dg_240726_DINH%20FANSIPAN.jpg"}
                        href={"/destinations"}
                        title={"Destinations"}
                    />
                </div>
                <div className="rounded-md overflow-hidden group">
                    <DestinationItem
                        img={"https://media.travel.com.vn/destination/dg_240606_dc_170823_cung-.jpg"}
                        href={"/destinations"}
                        title={"Destinations"}
                    />
                </div>
                <div className="md:col-span-2 rounded-md overflow-hidden group">
                    <DestinationItem
                        img={"https://media.travel.com.vn/destination/dg_240606_Peru.jpg"}
                        href={"/destinations"}
                        title={"Destinations"}
                    />
                </div>
                <div className="col-span-3 rounded-md overflow-hidden group">
                    <DestinationItem
                        img={"https://media.travel.com.vn/destination/dg_220601_BALI%20INDOSIA.jpg"}
                        href={"/destinations"}
                        title={"Destinations"}
                    />
                </div>
                
                <div className="col-span-3 md:col-span-5 row-span-2 rounded-md overflow-hidden group">
                    <DestinationItem
                        img={"https://media.travel.com.vn/destination/dg_240925_Las%20Ventas%20Bullring.jpg"}
                        href={"/destinations"}
                        title={"Destinations"}
                    />
                </div>
            </div> */}
            <div>
                <h1 className="text-center font-bold text-2xl mt-8 mb-4">Tour mới nhất</h1>
                <div className="grid grid-cols-3 gap-4">
                    {listNewTours.map(tour => {
                        return <TourItemH vertical tour={tour}/>
                    })}
                </div>
            </div>

            <div>
                <h1 className="text-center font-bold text-xl my-8">Đang giảm giá</h1>
                <div className="grid grid-cols-3 gap-4">
                {listDiscountTours.map(tour => {
                        return <TourItemH vertical tour={tour} />
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
