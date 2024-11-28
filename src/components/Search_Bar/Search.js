import { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const [inputValue, setInputValue] = useState({
        keyword: "",
        destination: "",
        duration: "",
    });
    console.log(inputValue);

    const navigate = useNavigate();
    const handleNavigate = (e) => {
        e.preventDefault();
        if (inputValue.destination === "" && inputValue.duration === "" && inputValue.keyword === "") {
            alert("Nhap day du thong tin");
        } else {
            navigate(
                `/search?keyword=${inputValue.keyword}&destination=${inputValue.destination}&duration=${inputValue.duration}`
            );
        }
    };

    // Hàm xử lý khi input thay đổi
    const handleInputChange = (e) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    return (
        <div className="">
            <div className="pb-0 container mx-auto">
                <div className="">
                    <form className="w-full md:flex md:space-x-2 mb-2" action="#" method="GET">
                        {/* <div className=" relative mt-1">
                            <input
                                className="w-full h-16 py-3 px-6 pr-12 border border-gray-300"
                                name="tour-search"
                                type="text"
                                id="keyword"
                                placeholder="Nhập để tìm kiếm"
                                value={inputValue.keyword}
                                onChange={handleInputChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                        </div> */}

                        <div className="w-full relative mt-1">
                            <select
                                className="w-full h-16 py-3 px-6 border border-gray-300 appearance-none "
                                name="tax-tour-destination"
                                onChange={handleInputChange}
                                id="destination"
                                value={inputValue.destination}
                            >
                                <option value="">Bạn muốn đi đâu?</option>
                                <option value="đà nẵng">Đà Nẵng</option>
                                <option value="africa-wild">Africa Wild</option>
                                <option value="america">America</option>
                                <option value="asia">Asia</option>
                                <option value="scandinavia">Scandinavia</option>
                                <option value="western-europe">Western Europe</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                <FaChevronDown className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        {/* <div className=" relative  mt-1">
                            <select
                                className="w-full h-16 py-3 px-6 pr-10 border border-gray-300  appearance-none"
                                name="duration"
                                id="duration"
                                value={inputValue.duration}
                                onChange={handleInputChange}
                            >
                                <option className="hover:bg-red-300" value="">
                                    Thời gian
                                </option>
                                <option value="1">1 Day Tour</option>
                                <option value="2">2-4 Days Tour</option>
                                <option value="5">5-7 Days Tour</option>
                                <option value="7">7+ Days Tour</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                <FaChevronDown className="h-5 w-5 text-gray-400" />
                            </div>
                        </div> */}

                        <div className="mt-1">
                            <input
                                className="h-16 w-full py-3 px-10 bg-red-500 text-white  cursor-pointer"
                                type="submit"
                                value="Tìm kiếm"
                                onClick={handleNavigate}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
