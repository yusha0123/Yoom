import CallList from "@/components/call-list";

const UpComingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h2 className="text-3xl font-bold">Upcoming Meeting</h2>
      <CallList type="Upcoming" />
    </section>
  );
};

export default UpComingPage;
