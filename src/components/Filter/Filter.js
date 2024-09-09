import style from "./Filter.module.css"
import { useState,useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRatingOption = ({ id, starsFilled, totalStars = 5 }) => {
    return (
      <div className="flex items-center">
        <input type="radio" name="rating" className="form-checkbox text-blue-600 h-4 w-4" id={id} />
        <label className="ml-2" htmlFor={id}>
          <p className="flex items-center">
            <span className="text-yellow-400 flex">
              {/* Hiển thị số ngôi sao đầy */}
              {Array(starsFilled)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} className="text-red-500 mx-2" />
                ))}
              {/* Hiển thị số ngôi sao rỗng */}
              {Array(totalStars - starsFilled)
                .fill()
                .map((_, index) => (
                  <FaRegStar key={index} className="text-red-500 mx-2" />
                ))}
            </span>
          </p>
        </label>
      </div>
    );
  };

const Filter = () => {

    const [minValue, setMinValue] = useState(2500000);
    const [maxValue, setMaxValue] = useState(5000000);
    const rangeRef = useRef(null);

    useEffect(() => {
        const rangeS = rangeRef.current.querySelectorAll('input[type="range"]');
        const numberS = rangeRef.current.querySelectorAll('input[type="number"]');

        rangeS.forEach((el) => {
        el.addEventListener('input', () => {
            let slide1 = parseFloat(rangeS[0].value),
            slide2 = parseFloat(rangeS[1].value);

            if (slide1 > slide2) {
            [slide1, slide2] = [slide2, slide1];
            }

            numberS[0].value = slide1;
            numberS[1].value = slide2;
        });
        });

    numberS.forEach((el) => {
      el.addEventListener('input', () => {
        let number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);

        if (number1 > number2) {
          let tmp = number1;
          numberS[0].value = number2;
          numberS[1].value = tmp;
        }

        rangeS[0].value = number1;
        rangeS[1].value = number2;
      });
    });
  }, []);


    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="flex flex-wrap">
                <div className="lg:w-1/4 sm:w-full w-full w-screen-full p-4 animate-fadeIn">
                    <div className="bg-white rounded p-6 animate-fadeIn border" style={{ backgroundColor: "#f8faff" }}>
                        <h3 className="text-xl font-semibold mb-4">BỘ LỌC TÌM KIẾM</h3>
                        <form action="#">
                            <div className="space-y-4">
                                <div className="form-group">
                                    <input type="text" className="form-control w-full px-4 py-2 border border-gray-300 rounded outline-none text-black"
                                        placeholder="Điểm đến, Thành phố"/>
                                </div>
                                <div className="form-group">
                                    <div className="relative">
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded bg-white outline-none">
                                            <option value="">Chọn địa điểm</option>
                                            <option value="">San Francisco USA</option>
                                            <option value="">Berlin Germany</option>
                                            <option value="">London United Kingdom</option>
                                            <option value="">Paris Italy</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="date" name="departure" className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                                        placeholder="Ngày khởi hành" data-toggle="datepicker"/>
                                </div>
                                <div className="form-group">
                                    <input type="date" name="arrival" className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                                        placeholder="Ngày đến" data-toggle="datepicker"/>
                                </div>
                                <div className="form-group flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" id="radio01" name="radio" className="form-radio h-4 w-4 text-blue-600 outline-none"/>
                                        <label htmlFor="radio01" className="ml-2">Xe bus</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" id="radio02" name="radio" className="form-radio h-4 w-4 text-blue-600 outline-none"/>
                                        <label htmlFor="radio02" className="ml-2">Máy bay</label>
                                    </div>
                                </div>
                                <div className="form-group range-slider" ref={rangeRef}>
                                    <div className="flex space-x-2">
                                        <input id="minValueInput" type="number" value={minValue} min="0" max="20000000" readOnly
                                            className="lg:w-1/2 sm:w-1/4 w-1/3 md:w-1/5 px-4 py-1 rounded outline-none" style={{ backgroundColor: "#f8faff" }}/> - 
                                        <input id="maxValueInput" type="number" value={maxValue} min="0" max="20000000" readOnly
                                            className="lg:w-1/2 sm:w-1/4 w-1/3 md:w-1/5 px-4 py-1 rounded outline-none" style={{ backgroundColor: "#f8faff" }}/>
                                    </div>
                                    <div className="mt-4 relative mb-14">
                                        <input
                                            id="minRange"
                                            type="range"
                                            defaultValue={minValue}
                                            min="0"
                                            max="20000000"
                                            step="500000"
                                            className="w-full h-2 bg-blue-300 rounded outline-none absolute top-0 left-0"
                                        />
                                        <input
                                            id="maxRange"
                                            type="range"
                                            defaultValue={maxValue}
                                            min="0"
                                            max="20000000"
                                            step="500000"
                                            className="w-full h-2 bg-blue-500 rounded outline-none absolute top-0 left-0"
                                        />
                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Tìm kiếm"
                                        className="w-full bg-red-500 border text-white py-3 px-5 rounded hover:bg-white hover:text-red-500 border-red-500 outline-none cursor-pointer"/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="sidebar-wrap bg-gray-100 p-6 animate__animated animate__fadeIn border" style={{ backgroundColor: "#f8faff" }}>
                        <h3 class="text-lg font-semibold mb-4">Star Rating</h3>
                        <form method="post" className="space-y-2 form-group">
                            <StarRatingOption id="star1" starsFilled={5} />
                            <StarRatingOption id="star2" starsFilled={4} />
                            <StarRatingOption id="star3" starsFilled={3} />
                            <StarRatingOption id="star4" starsFilled={2} />
                            <StarRatingOption id="star5" starsFilled={1} />
                        </form>
                    </div>
                </div>

                <div className="lg:w-3/4 sm:w-full w-full w-screen-full">   
                </div>
            </div>
        </div> 
    )
}

export default Filter;
