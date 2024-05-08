"use client";

/* A client side component for showing the time to prevent showing server time due to SSR*/

import { format } from "date-fns";
import { useEffect, useState } from "react";

const Time = () => {
  const [isMounted, setisMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const time = format(currentTime, "h:mm a");
  const date = format(currentTime, "EEEE, MMMM dd, yyyy");

  useEffect(() => {
    setisMounted(true);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isMounted) return null; //prevent hyderation error

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
    </div>
  );
};

export default Time;
