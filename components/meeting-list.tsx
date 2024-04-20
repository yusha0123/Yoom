"use client";

import { useState } from "react";
import HomeCard from "./home-card";
import { useRouter } from "next/navigation";

const MeetingList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const router = useRouter();

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        imgSrc="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        imgSrc="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        onClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        imgSrc="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        imgSrc="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        onClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MeetingList;
