
import TourItemH from "../../components/TourItem/TourItemHorizonal";

import { useEffect, useState } from "react";
import axios from "axios";

const Favorite = () => {
  const [listFavoriteTours, setListFavoriteTours] = useState([]);
  useEffect(() => {
    const fetchListNewTours = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_URL + "/tour/favorite",
          {
            withCredentials: true,
          }
        );
        setListFavoriteTours(res.data);
      } catch (error) {
        alert("Đã xảy ra lỗi");
      }
    };

    fetchListNewTours();
  }, []);

  return (
    <div>
      <h1
        className="relative text-left font-bold text-3xl mt-8 mb-4 after:content-[''] after:absolute after:bg-blue-600 after:bottom-[-5px] after:left-0 after:w-[100px] after:h-[4px]"
        style={{ color: "#0b55d7" }}
      >
        {listFavoriteTours?.favor_tours?.length > 0 ? 'Danh sách tour yêu thích' : 'Danh sách trống'}
        
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-screen">
        {listFavoriteTours?.favor_tours?.map((tour) => {
          return <TourItemH vertical tour={tour} />;
        })}
      </div>
    </div>
  );
};

export default Favorite;
