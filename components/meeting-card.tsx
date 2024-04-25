"use client";

import { Check, Copy, LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { format } from "date-fns";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  ButtonIcon?: LucideIcon;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  ButtonIcon,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const [copied, setCopied] = useState(false);

  const meetingDate = format(new Date(date), "yyyy/MM/dd h:mm a");

  const onCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="flex min-h-52 w-full flex-col justify-between rounded-xl bg-dark-1 px-5 py-8 xl:max-w-xl">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="meeting-image" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 truncate">
            <h4 className="text-2xl font-bold truncate">{title}</h4>
            <p className="text-base font-normal">{meetingDate}</p>
          </div>
        </div>
      </article>
      <article className="flex justify-center">
        {!isPreviousMeeting && (
          <div className="flex gap-4 mt-5">
            <Button onClick={handleClick}>
              {ButtonIcon && <ButtonIcon className="size-4 mr-2" />}
              {buttonText}
            </Button>
            <Button onClick={onCopy} variant={"secondary"} disabled={copied}>
              {!copied ? (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy Link
                </>
              ) : (
                <>
                  <Check className="size-4 mr-2" />
                  Copied!
                </>
              )}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
