import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";
import AccountsTable from "../../components/Table/AccountTable";

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-4 gap-3 w-full mt-5 h-screen">
                <div className="col-span-2 row-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="md:col-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="col-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="col-span-3 md:col-span-5 row-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/Tour/tfd_240723062121_604898_LANG%20HO%20CHU%20TICH.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div>
                <AccountsTable />
            </div>
        </>
    );
};

export default Home;
