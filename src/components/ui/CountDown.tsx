import { useState, useEffect } from "react";

interface TimeLeft {
  minutes: number;
  seconds: number;
}

export default function CountDown({
  countdown_duration_ms,
}: {
  countdown_duration_ms: number;
}) {
  const [endTime] = useState(() => Date.now() + countdown_duration_ms);

  function calculateTimeLeft(): TimeLeft {
    const difference = endTime - Date.now();
    if (difference <= 0) {
      return { minutes: 0, seconds: 0 };
    }
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (value: number): string =>
    value.toString().padStart(2, "0");

  return (
    <div className="text-slate-950 text-base font-medium mb-10 z-50">
      {timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
        <span>Time's up!</span>
      ) : (
        <span>
          ⏱️ {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      )}
    </div>
  );
}
