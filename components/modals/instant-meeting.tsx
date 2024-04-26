"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const InstantMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();
  const router = useRouter();

  const handleClick = async () => {
    if (!client || !user) return;
    try {
      setLoading(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: "Instant Meeting",
          },
        },
      });
      onClose();
      router.push(`/meeting/${call.id}`);
      toast.success("Meeting Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen && type === "instant-meeting"} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white outline-none">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold leading-[42px] text-center">
            Start an Instant Meeting
          </h2>
          <Button onClick={handleClick} isLoading={loading}>
            Start Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstantMeeting;
