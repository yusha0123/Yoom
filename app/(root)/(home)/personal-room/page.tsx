"use client";

import { Button } from "@/components/ui/button";
import useGetCallById from "@/hooks/useGetCallById";
import useOrigin from "@/hooks/useOrigin";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h3 className="text-base font-medium text-sky-1 lg:text-xl">{title}:</h3>
    <h4 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h4>
  </div>
);

const PersonalRoomPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
    try {
      const newCall = client.call("default", meetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      toast.error("Failed to create meeting!");
    }
  };

  const meetingLink = `${origin}/meeting/${meetingId}?personal=true`;

  const onCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <h2 className="text-3xl font-bold">Personal Room</h2>
      <div className="flex w-full flex-col gap-8 xl:max-w-4xl overflow-hidden">
        <Table
          title="Topic"
          description={`${user?.firstName} ${user?.lastName}'s Meeting Room`}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button onClick={startRoom}>Start Meeting</Button>
        <Button
          variant={"secondary"}
          onClick={onCopy}
          disabled={copied}
          className="transition duration-300"
        >
          {copied ? (
            <>
              Copied <Check className="size-4 ml-2" />
            </>
          ) : (
            <>
              Copy Invitation
              <Copy className="size-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;
