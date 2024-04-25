"use client";

import InstantMeeting from "@/components/modals/instant-meeting";
import JoinMeeting from "@/components/modals/join-meeting";
import ScheduleMeeting from "@/components/modals/schedule-meeting";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <InstantMeeting />
      <ScheduleMeeting />
      <JoinMeeting />
    </>
  );
};

export default ModalProvider;
