"use client";

import { useState } from "react";
import HomeCard from "./home-card";
import { useRouter } from "next/navigation";
import MeetingModal from "./meeting-modal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Calendar, Plus, UserPlus, Video } from "lucide-react";

const MeetingList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const router = useRouter();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetail, setCallDetail] = useState<Call>();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        return toast.info("Please select a date and time!");
      }
      setLoading(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success("Meeting Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        Icon={Plus}
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        Icon={UserPlus}
        title="Join Meeting"
        description="Via invitation link"
        onClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        Icon={Calendar}
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        Icon={Video}
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        onClick={() => router.push("/recordings")}
      />
      <MeetingModal
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        isLoading={loading}
        isOpen={meetingState === "isInstantMeeting"}
        handleClick={createMeeting}
        onClose={() => setMeetingState(undefined)}
      />
    </section>
  );
};

export default MeetingList;
