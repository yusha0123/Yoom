import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Copy } from "lucide-react";

const ScheduleMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [isMeetingScheduled, setisMeetingScheduled] = useState(false);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

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
      setisMeetingScheduled(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen && type === "schedule-meeting"} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        {isMeetingScheduled ? (
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
            <Button>
              Copy invitation link <Copy className="w-4 h-4 ml-2" />
            </Button>
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
