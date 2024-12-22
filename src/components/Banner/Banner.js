import React from "react";
import SearchBar from "../Search_Bar/Search";
import banner from "../../assets/images/banner.webp";
function Banner() {
    return (
        <div className="relative w-full">
            <img src={banner} alt="banner" />
            <div className=" sm:absolute bottom-16 left-2/4 sm:translate-x-[-50%] translate-x-[0] sm:w-4/5 xl:w-full w-full">
                <SearchBar />
            </div>
        </div>
    );
}

export default Banner;
