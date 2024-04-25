"use client";

import useModalStore from "@/hooks/useModalStore";
import { Calendar, Plus, UserPlus, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import HomeCard from "./home-card";

const MeetingList = () => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        Icon={Plus}
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        onClick={() => onOpen("instant-meeting")}
      />
      <HomeCard
        Icon={UserPlus}
        title="Join Meeting"
        description="Via invitation link"
        onClick={() => onOpen("join-meeting")}
        className="bg-blue-1"
      />
      <HomeCard
        Icon={Calendar}
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        onClick={() => onOpen("schedule-meeting")}
      />
      <HomeCard
        Icon={Video}
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        onClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MeetingList;
