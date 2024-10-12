import BookingPanel from "../../components/BookingPanel/BookingPanel";
import Slider from "../../components/Slider/Slider";
import Ltinerary from "../../components/Ltinerary/Ltinerary";

const TourDetail = () => {
  return (
    <div className="flex justify-center flex-col">
      <h1 className="font-bold text-3xl py-4">
        Dịch Vụ Tham Quan Trải Nghiệm Xe Bus 2 Tầng & Ăn Tối Trên Tàu Indochina
      </h1>
      <div className="block lg:flex">
        <div className="w-full lg:w-3/5 mr-8">
          <Slider />
          <h1 className="text-center font-bold text-3xl py-4">
            Lịch khởi hành
          </h1>
          <h1 className="text-center font-bold text-3xl py-4">Lịch trình</h1>
          <Ltinerary />
        </div>
        <BookingPanel />
      </div>
    </div>
  );
};

export default TourDetail;
