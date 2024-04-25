"use client";

import useGetCalls from "@/hooks/useGetCalls";
import useOrigin from "@/hooks/useOrigin";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "./loader";
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
  const [loadingRecordings, setLoadingRecordings] = useState(false);

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

  useLayoutEffect(() => {
    const fetchRecordings = async () => {
      try {
        setLoadingRecordings(true);
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.error("Please try again later!");
      } finally {
        setLoadingRecordings(false);
      }
    };

    if (type === "Recordings") fetchRecordings();
  }, [type, callRecordings]);

  if (isLoading || loadingRecordings) {
    return <Loader />;
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id || crypto.randomUUID()}
            icon={
              type === "Ended"
                ? "/icons/previous.svg"
                : type === "Upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time
            }
            isPreviousMeeting={type === "Ended"}
            link={
              type === "Recordings"
                ? (meeting as CallRecording).url
                : `${origin}/meeting/${(meeting as Call).id}`
            }
            ButtonIcon={type === "Recordings" ? Play : undefined}
            buttonText={type === "Recordings" ? "Play" : "Start"}
            handleClick={
              type === "Recordings"
                ? () => router.push((meeting as CallRecording).url)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h3 className="text-2xl font-bold text-white">{noCallsMessage}</h3>
      )}
    </div>
  );
};

export default CallList;
