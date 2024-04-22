import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

const ScheduleMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();

  const handleClick = () => {};

  return (
    <Dialog open={isOpen && type === "schedule-meeting"} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold leading-[42px] text-center">
            Create Meeting
          </h2>
          <Button onClick={handleClick} isLoading={loading}>
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;
