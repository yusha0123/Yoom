"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const JoinMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [link, setlink] = useState("");
  const router = useRouter();

  const handleClick = () => {
    onClose();
    router.push(`/meeting/${link}`);
  };

  return (
    <Dialog open={isOpen && type === "join-meeting"} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold leading-[42px] text-center">
            Join Meeting
          </h2>
          <Input
            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={link}
            placeholder="Enter meeting id"
            onChange={(e) => setlink(e.target.value)}
          />
          <Button disabled={!link} onClick={handleClick}>
            Join
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeeting;
