import React from "react";
import { FcAlarmClock } from "react-icons/fc";
import { GiAlarmClock } from "react-icons/gi";
import { useTimer } from "react-timer-hook";

const CountdownTimer = ({ initialMinutes, handleTimeOut }) => {
    const { seconds, minutes, start, pause, resume, reset } = useTimer({
        expiryTimestamp: new Date().getTime() + initialMinutes * 60 * 1000, // Thời gian đếm ngược (phút)
        onExpire: async () => {
            console.warn("Hết thời gian!")
            //cancel service
            handleTimeOut()

        }
    });

    return (
        <div className="flex justify-center items-center">
            <div className="text-2xl text-red-700 font-bold px-8 py-2 rounded-md">
                <span>Thời gian còn lại: </span>
                {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
            </div>
        </div>
    );
};

export default CountdownTimer;
