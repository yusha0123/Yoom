"use client";

import useGetCalls from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./loader";
import useOrigin from "@/hooks/useOrigin";
import MeetingCard from "./meeting-card";

type Props = {
  type: "Ended" | "Upcoming" | "Recordings";
};

const CallList = ({ type }: Props) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const origin = useOrigin();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "Ended":
        return endedCalls;
      case "Recordings":
        return recordings;
      case "Upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "Ended":
        return "No Previous Calls";
      case "Upcoming":
        return "No Upcoming Calls";
      case "Recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "Ended"
                ? "/icons/previous.svg"
                : type === "Upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "Ended"}
            link={
              type === "Recordings"
                ? (meeting as CallRecording).url
                : `${origin}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === "Recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "Recordings" ? "Play" : "Start"}
            handleClick={
              type === "Recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h2 className="text-2xl font-bold text-white">{noCallsMessage}</h2>
      )}
    </div>
  );
};

export default CallList;
