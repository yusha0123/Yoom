"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useModalStore from "@/hooks/useModalStore";
import useOrigin from "@/hooks/useOrigin";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Check, Copy } from "lucide-react";
import DatePicker from "react-datepicker";
import { toast } from "sonner";

const ScheduleMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const client = useStreamVideoClient();
  const origin = useOrigin();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callDetail, setCallDetail] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
  });

  const meetingLink = `${origin}/meeting/${callDetail?.id}`;

  const handleClick = async () => {
    if (!client || !user) return;
    try {
      setLoading(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      await call.getOrCreate({
        data: {
          starts_at: values.dateTime.toISOString(),
          custom: {
            description: values.description,
          },
        },
      });
      toast.success("Meeting scheduled successfully!");
      setCallDetail(call);
    } catch (error) {
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setCallDetail(undefined);
    setLoading(false);
    setCopied(false);
    setValues({
      dateTime: new Date(),
      description: "",
    });
  };

  return (
    <Dialog
      open={isOpen && type === "schedule-meeting"}
      onOpenChange={handleClose}
    >
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        {callDetail ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <Image
                alt="checked"
                width={72}
                height={72}
                src={"/icons/checked.svg"}
              />
            </div>
            <h2 className="text-3xl font-bold leading-[42px] text-center">
              Meeting Scheduled
            </h2>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs rounded-l-md h-8 bg-dark-3 truncate outline-none"
                value={meetingLink}
                readOnly
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold leading-[42px] text-center">
              Create Meeting
            </h2>
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="description">Add a description</Label>
              <Textarea
                name="description"
                value={values.description}
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
                className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <Label htmlFor="description">Select Date and Time</Label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </div>
            <Button onClick={handleClick} isLoading={loading}>
              Schedule Meeting
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;
