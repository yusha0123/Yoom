"use client";

import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import Alert from "./ui/alert";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggled, setisMicCamToggled] = useState(false);
  const call = useCall();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

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

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-3 text-white p-2">
      <h2 className="text-2xl font-bold">Setup</h2>
      <div className="max-w-2xl max-h-[70%] mx-auto">
        <VideoPreview />
      </div>
      <div className="flex h-16 items-center justify-center gap-3">
        <div className="flex items-center space-x-4">
          <Switch
            id="toggle"
            className="bg-gray-500"
            checked={isMicCamToggled}
            onCheckedChange={(e) => setisMicCamToggled(e.valueOf())}
          />
          <Label htmlFor="toggle">Join with mic and camera off</Label>
        </div>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
