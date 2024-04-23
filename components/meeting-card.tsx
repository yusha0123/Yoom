"use client";

import Image from "next/image";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-64 w-full flex-col justify-between rounded-xl bg-dark-1 px-5 py-8 xl:max-w-xl">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="meeting-image" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className="flex justify-center relative">
        {!isPreviousMeeting && (
          <div className="flex gap-4">
            <Button onClick={handleClick}>
              {buttonIcon1 && (
                <>
                  <Image
                    src={buttonIcon1}
                    alt="feature"
                    width={20}
                    height={20}
                  />
                  &nbsp;
                </>
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("link Copied to clipboard!");
              }}
              variant={"secondary"}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
