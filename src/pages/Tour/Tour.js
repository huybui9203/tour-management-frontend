
import TourItemH from "../../components/TourItem/TourItemHorizonal"
import Filter from "../../components/Filter/Filter"
import Pagination from "../../components/Pagination/Pagination"


const Tour = () => {
    return (
        <div className="w-[1156px] flex gap-4">
            <div className="w-1/4">
                    <Filter />
            </div>
            <div className="w-3/4">
                <div className="bg-orange-400 mt-4">filter here</div>
                <div>
                    <TourItemH />
                    <TourItemH />
                    <TourItemH />
                    <TourItemH />
                    <TourItemH />
                </div>
                <div className="flex justify-center py-4"><Pagination /></div>
            </div>
        </div>
    )
}

export default Tour