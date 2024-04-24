import CallList from "@/components/call-list";

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h2 className="text-3xl font-bold">Recorded Meetings</h2>
      <CallList type="Recordings" />
    </section>
  );
};

export default RecordingsPage;
