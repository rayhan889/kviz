import React, { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface CountDownProps {
  countdown_duration_ms: number;
  setTimesUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const CountDown: React.FC<CountDownProps> = ({
  countdown_duration_ms,
  setTimesUp,
}: CountDownProps) => {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    minutes: 0,
    seconds: 0,
  });
  const [isPaused, setIsPaused] = useState(false);

  const calculateTimeLeft = useCallback((end: number): TimeLeft => {
    const difference = end - Date.now();
    if (difference <= 0) {
      return { minutes: 0, seconds: 0 };
    }
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const saveState = useCallback((end: number, paused: boolean) => {
    localStorage.setItem(
      "countdownState",
      JSON.stringify({
        endTime: end,
        isPaused: paused,
        lastUpdated: Date.now(),
      })
    );
  }, []);

  const loadState = useCallback(() => {
    const storedState = localStorage.getItem("countdownState");
    if (storedState) {
      const {
        endTime: storedEndTime,
        isPaused: storedIsPaused,
        lastUpdated,
      } = JSON.parse(storedState);
      const currentTime = Date.now();
      const timePassed = currentTime - lastUpdated;

      if (!storedIsPaused) {
        const newEndTime = storedEndTime + timePassed;
        if (newEndTime > currentTime) {
          setEndTime(newEndTime);
          setIsPaused(false);
          return true;
        }
      } else {
        if (storedEndTime > currentTime) {
          setEndTime(storedEndTime);
          setIsPaused(true);
          return true;
        }
      }
    }
    return false;
  }, []);

  useEffect(() => {
    const stateLoaded = loadState();
    if (!stateLoaded) {
      const newEndTime = Date.now() + countdown_duration_ms;
      setEndTime(newEndTime);
      saveState(newEndTime, false);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
        if (endTime) saveState(endTime, true);
      } else {
        const stateLoaded = loadState();
        if (!stateLoaded && endTime) {
          const newEndTime = Date.now() + (endTime - Date.now());
          setEndTime(newEndTime);
          setIsPaused(false);
          saveState(newEndTime, false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [countdown_duration_ms, endTime, loadState, saveState]);

  useEffect(() => {
    if (endTime === null || isPaused) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
        localStorage.removeItem("countdownState");
        setTimesUp(true);
      } else {
        saveState(endTime, false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, isPaused, calculateTimeLeft, setTimesUp, saveState]);

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
};

export default CountDown;
