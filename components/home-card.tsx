import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  imgSrc: string;
  title: string;
  description: string;
  className?: string;
  onClick: () => void;
};

const HomeCard = ({
  imgSrc,
  title,
  description,
  onClick,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-72 min-h-64 rounded-lg cursor-pointer transition-transform hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded-sm">
        <Image src={imgSrc} width={27} height={27} alt={title} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
