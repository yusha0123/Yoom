import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick: () => void;
};

const HomeCard = ({ Icon, title, description, onClick, className }: Props) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-72 min-h-64 rounded-lg cursor-pointer transition-transform hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded">
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
