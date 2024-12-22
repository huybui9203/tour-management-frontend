import { FaChevronDown } from "react-icons/fa";
const Sort = ({ sortQuery, handleSortQuery }) => {
    return (
        <div className="flex items-center justify-end  py-3  ">
            <span className="mr-2">Sắp xếp theo:</span>
            <div className="relative ">
                <select
                    className="w-full rounded py-2 pr-10 pl-4 border border-gray-300 appearance-none"
                    value={sortQuery}
                    onChange={(e) => {
                        handleSortQuery(e.target.value);
                    }}
                >
                    <option value="all">Tất cả</option>
                    <option value="asc_price">Giá tăng dần</option>
                    <option value="desc_price">Giá giảm dần</option>
                    <option value="lastest">Ngày khởi hành gần nhất</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                    <FaChevronDown className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default Sort;
