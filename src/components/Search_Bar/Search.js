import { useState } from "react";
import { FaSearch ,FaChevronDown} from "react-icons/fa";
const SearchBar = () => {

    const [inputValue, setInputValue] = useState("");

  // Hàm xử lý khi input thay đổi
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
    return (
    <div className="">
      <div className="pb-0 container mx-auto">
        <div className="">
          <form className="w-full md:flex md:space-x-2 mb-2" action='#' method="GET">
          <div className="md:w-1/4 w-[172px] relative  mt-1">
            <input className="w-full h-16 py-3 px-6 pr-12 border border-gray-300" name="tour-search" type="text" placeholder="Keywords"value={inputValue}
        onChange={handleInputChange}/>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                   <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
          </div>

              <div className="md:w-1/4 relative mt-1">
                <select className="w-full h-16 py-3 px-6 border border-gray-300 appearance-none " name="tax-tour-destination">
                  <option value={inputValue}>Destination</option>
                  <option value="africa-adventure">Africa Adventure</option>
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
              <div className="md:w-1/4 relative  mt-1">
                <select className="w-full h-16 py-3 px-6 pr-10 border border-gray-300  appearance-none" name="duration">
                    <option className="hover:bg-red-300" value={inputValue}>Duration</option>
                    <option value="1">1 Day Tour</option>
                    <option value="2">2-4 Days Tour</option>
                    <option value="5">5-7 Days Tour</option>
                    <option value="7">7+ Days Tour</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                   <FaChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>

            <div className="md:w-1/4  mt-1">
                <input className="h-16 w-full  py-3 px-6 bg-red-500 text-white  cursor-pointer" type="submit" value="Search"/>
            </div>
          </form>
        </div>
      </div>
    </div>

    );
} ;

export default SearchBar