import Example from "../../components/Example/Example"
import Filter from "../../components/Filter/Filter"
import Header from "../../components/Header/Header"
import SearchBar from "../../components/Search_Bar/Search"
import TourItemH from "../../components/TourItem/TourItemHorizonal"
import Pagination from "../../components/Pagination/Pagination"
import banner from '../../assets/images/bgtravel.jpg'

const Home = () => {
    return (
        <div>
            <div className="relative">
                <img src={banner} alt="banner" />
                <div className="absolute bottom-16 left-2/4 translate-x-[-50%]"><SearchBar /></div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-[1156px]">
                <TourItemH />
                <TourItemH />
                <TourItemH />
                
            </div>
        </div>

    )
}

export default Home