import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";
import AccountsTable from "../../components/Table/AccountTable";
import Modal from "../../components/Modal/Modal";

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-4 gap-3 w-full mt-5 h-screen">
                <div className="col-span-2 row-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="md:col-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="col-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="col-span-3 md:col-span-5 row-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://media.travel.com.vn/destination/dg_240726_'Eiffel%20Tower.jpg"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div>
                <AccountsTable />
                <Modal/>
            </div>
        </>
    );
};

export default Home;
