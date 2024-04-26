"use client";

import Loader from "@/components/loader";
import MeetingRoom from "@/components/meeting-room";
import MeetingSetup from "@/components/meeting-setup";
import { buttonVariants } from "@/components/ui/button";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MeetingIdPage = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading || !isLoaded) return <Loader />;

  if (!call) {
    return (
      <div className="size-full flex flex-col items-center justify-center">
        <Image
          src={"/icons/not-found.svg"}
          width={300}
          height={300}
          alt="not-found"
        />
        <p className="text-2xl font-bold text-white mb-5">Call not found!</p>
        <Link className={buttonVariants()} href={"/"}>
          Return to home screen
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-[100dvh] w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingIdPage;
