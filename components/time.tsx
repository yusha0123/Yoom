"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

const Time = () => {
  const now = new Date();
  const [isMounted, setisMounted] = useState(false);

  const time = format(now, "h:mm a");
  const date = format(now, "EEEE, MMMM dd, yyyy");

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
    </>
  );
};

export default Time;
