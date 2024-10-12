import React from "react";
import { FcAlarmClock } from "react-icons/fc";
import { GiAlarmClock } from "react-icons/gi";
import { useTimer } from "react-timer-hook";

const CountdownTimer = ({ initialMinutes }) => {
    const { seconds, minutes, start, pause, resume, reset } = useTimer({
        expiryTimestamp: new Date().getTime() + initialMinutes * 60 * 1000, // Thời gian đếm ngược (phút)
        onExpire: () => console.warn("Hết thời gian!"),
    });

    return (
        <div className="flex justify-center items-center">
            <div className="text-xl bg-gray-200 px-8 py-2 rounded-md">
                {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
            </div>
        </div>
    );
};

export default CountdownTimer;
