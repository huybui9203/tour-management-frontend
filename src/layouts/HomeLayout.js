import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AuthGuard from "../components/Guard/AuthGuard";
import banner from "../assets/images/bgtravel.jpg";
import SearchBar from "../components/Search_Bar/Search";
import Toast from "../components/Toast/Toast";

const HomeLayout = () => {
    return (
        <div>
            <Header />

            <div className="main flex flex-col items-center mt-[68px]">
                <div className="relative">
                    <img src={banner} alt="banner" />
                    {/* <div className=" sm:absolute bottom-16 left-2/4 sm:translate-x-[-50%] translate-x-[0]  sm:w-4/5 xl:w-[500px] w-full">
                        <SearchBar />
                    </div> */}
                </div>
                <main className="w-[1156px] max-w-full max-xl:px-16 max-md:px-8 max-sm:px-2">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
