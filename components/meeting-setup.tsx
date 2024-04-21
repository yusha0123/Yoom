"use client";

import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = () => {
  const [isMicCamToggled, setisMicCamToggled] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component!"
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-3 text-white p-2">
      <h2 className="text-2xl font-bold">Setup</h2>
      <VideoPreview />
    </div>
  );
};

export default MeetingSetup;
