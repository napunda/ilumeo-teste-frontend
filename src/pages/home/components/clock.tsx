import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="text-center text-white text-4xl sm:text-6xl md:text-9xl font-bold fixed-width-clock">
      <div className="flex justify-center items-center">
        <div className="time-unit w-auto sm:w-24 md:w-44 text-center">
          {hours}
        </div>
        <span className="mx-2">:</span>
        <div className="time-unit w-auto sm:w-24 md:w-44 text-center">
          {minutes}
        </div>
        <span className="mx-2">:</span>
        <div className="time-unit w-auto sm:w-24 md:w-44 text-center">
          {seconds}
        </div>
      </div>
    </div>
  );
};

export default Clock;
