"use client";

import Loader from "@/components/loader";
import MeetingRoom from "@/components/meeting-room";
import MeetingSetup from "@/components/meeting-setup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const MeetingIdPage = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading || !isLoaded) return <Loader />;

  return (
    <main className="h-[100dvh] w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? <MeetingRoom /> : <MeetingSetup />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingIdPage;
