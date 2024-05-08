import MeetingList from "@/components/meeting-list";
import Time from "@/components/time";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="w-full h-60 px-5 sm:px-8 py-8 md:h-64 md:py-4 lg:h-72 rounded-lg bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between md:px-5 md:py-8">
          <h2 className="glassmorphism w-fit rounded md:px-6 px-4 py-2 text-center text-base font-normal">
            Welcome back, {user?.firstName} {user?.lastName} &#128075;
          </h2>
          <Time />
        </div>
      </div>
      <MeetingList />
    </section>
  );
};

export default HomePage;
