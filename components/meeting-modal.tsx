type Props = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  handleClick: () => void;
  title: string;
  buttonText: string;
  className?: string;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
};

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, ReactNode } from "react";
import { Button } from "./ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  handleClick,
  title,
  buttonText,
  className,
  buttonIcon,
  children,
  image,
  isLoading,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className={
              "bg-blue-1 hover:bg-blue-1/75 transition duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
            isLoading={isLoading}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MeetingModal);
