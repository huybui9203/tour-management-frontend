import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiInformation2Fill } from "react-icons/ri";

function QuantityRegistant({ type, onIncrease, onDecrease, quantity, onHandleDataRegistant }) {
    const infor = {
        heading: "Người lớn",
        ages: "Từ 12 tuổi",
    };
    let heading = "Người lớn";
    if (type === "child") {
        infor.heading = "Trẻ em";
        infor.ages = "Từ 2 - 11 tuổi";
    }

    return (
        <div className="flex flex-col p-3 border border-blue-300 rounded-lg">
            <h2 className="text-sm font-bold">{infor.heading}</h2>
            <p className="text-sm flex items-center gap-2">
                {infor.ages} <RiInformation2Fill />
            </p>
            <div className="flex items-center justify-between border rounded-lg px-3 py-1 mt-6">
                <button
                    className="p-3 hover:bg-gray-200 rounded-lg group"
                    onClick={() => {
                        if (type === "adult") {
                            if (quantity > 1) {
                                onDecrease();
                                onHandleDataRegistant();
                            }
                        } else {
                            if (quantity > 0) {
                                onDecrease();
                                onHandleDataRegistant();
                            }
                        }
                    }}
                >
                    <FaMinus className="group-hover:text-blue-800" />
                </button>
                <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="bg-transparent self-center inline-block pointer-events-none outline-none w-10 text-center"
                />
                <button className="p-3 hover:bg-gray-200 rounded-lg group" onClick={onIncrease}>
                    <FaPlus className="group-hover:text-blue-800" />
                </button>
            </div>
        </div>
    );
}

export default QuantityRegistant;
