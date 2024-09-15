import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";

const Home = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <TourItemH />
                <TourItemH />
                <TourItemH />
            </div>
        </div>
    );
};

export default Home;
