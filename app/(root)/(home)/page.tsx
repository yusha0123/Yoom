import MeetingList from "@/components/meeting-list";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";

const HomePage = async () => {
  const user = await currentUser();
  const now = new Date();

  const time = format(now, "h:mm a");
  const date = format(now, "EEEE, MMMM dd, yyyy");

  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="w-full h-60 px-5 sm:px-8 py-8 md:h-64 md:py-4 lg:h-72 rounded-lg bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between md:px-5 md:py-8">
          <h2 className="glassmorphism w-fit rounded px-6 py-2 text-center text-base font-normal">
            Welcome back, {user?.firstName} {user?.lastName} &#128075;
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingList />
    </section>
  );
};

export default HomePage;
