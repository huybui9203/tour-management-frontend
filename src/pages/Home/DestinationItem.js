import React from "react";
import { Link } from "react-router-dom";

function DestinationItem({ img, href, title }) {
    return (
        <div className="relative w-full h-full">
            <img src={img} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 inset-y-0 bg-black bg-opacity-80 z-10 hidden group-hover:flex flex-col gap-2 justify-center items-center transition-all duration-700">
                <h1 className="text-white text-xl uppercase font-semibold">{title}</h1>
                <Link to={href} className="px-6 py-3 rounded bg-blue-500 text-white font-semibold text-sm">
                    Khám phá
                </Link>
            </div>
        </div>
    );
}

export default DestinationItem;
