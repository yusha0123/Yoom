import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "./button";
import { Card, CardContent } from "./card";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex items-center justify-center h-[100dvh]">
      <Card className="w-full max-w-lg border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex items-center justify-center">
                  <Image src={iconUrl} width={75} height={75} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Link href="/" className={buttonVariants()}>
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
