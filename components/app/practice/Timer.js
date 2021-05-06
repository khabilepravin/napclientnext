import React, { useEffect, useState } from "react";

const Timer = ({ minutes }) => {
    const [countdownTimer, setCountdownTimer] = useState({ minutes:minutes, seconds:0 });

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdownTimer.seconds > 0) {
                setCountdownTimer({ ...countdownTimer, seconds: (countdownTimer.seconds - 1)   });
            }
            if (countdownTimer.seconds === 0) {
                if (countdownTimer.minutes === 0) {
                    clearInterval(interval)
                } else {
                    setCountdownTimer({ minutes: countdownTimer.minutes -1, seconds: 59 });
                }
            } 
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [countdownTimer]);

    return (
        <div className="float-right">
            { countdownTimer.minutes === 0 && countdownTimer.seconds === 0
                ? <h4>Times up!</h4>
                : <h4>Time Remaining: {countdownTimer.minutes}:{countdownTimer.seconds < 10 ? `0${countdownTimer.seconds}` : countdownTimer.seconds}</h4>
            }
        </div>
    )

}

export default Timer;