"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  link: string;
};

const JoinMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { link } = data;
    onClose();
    reset();

    router.push(link.includes("/meeting/") ? link : `/meeting/${link}`);
  };

  return (
    <Dialog open={isOpen && type === "join-meeting"} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white outline-none">
        <h2 className="text-3xl font-bold leading-[42px] text-center mb-3">
          Join Meeting
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter meeting id or link"
            {...register("link", {
              required: true,
            })}
          />
          <Button type="submit">Join</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeeting;
