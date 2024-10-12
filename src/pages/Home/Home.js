import Example from "../../components/Example/Example";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Search_Bar/Search";
import TourItemH from "../../components/TourItem/TourItemHorizonal";
import Pagination from "../../components/Pagination/Pagination";
import banner from "../../assets/images/bgtravel.jpg";

const Home = () => {
    return (
        <>
            <div className="block sm:grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-4 gap-3 w-full mt-5 h-screen">
                <div className="col-span-2 row-span-2 rounded-md overflow-hidden">
                    <img
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/461312876_552333440596447_3225585063981687860_n.png?_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_ohc=XhrsLtgE4TgQ7kNvgHmvOIb&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AOue75V3PixkyfEvcSvOhno&oh=03_Q7cD1QGryCaZ35MWZiKcUMaR1Mv3erQ6xpCvNymziPSmIcYMfg&oe=67278D48"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="rounded-md overflow-hidden">
                    <img
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/461312876_552333440596447_3225585063981687860_n.png?_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_ohc=XhrsLtgE4TgQ7kNvgHmvOIb&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AOue75V3PixkyfEvcSvOhno&oh=03_Q7cD1QGryCaZ35MWZiKcUMaR1Mv3erQ6xpCvNymziPSmIcYMfg&oe=67278D48"
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

        </>
    );
};

export default Home;
