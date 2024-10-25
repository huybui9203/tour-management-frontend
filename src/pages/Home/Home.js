import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";
import DestinationItem from "./DestinationItem";

const Home = () => {
    return (
        <>
            <div className="block sm:grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-4 gap-3 w-full mt-5 h-screen">
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
            </div>
        </>
    );
};

export default Home;
