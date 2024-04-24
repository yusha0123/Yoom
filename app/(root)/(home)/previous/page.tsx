import CallList from "@/components/call-list";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h2 className="text-3xl font-bold">Previous Meetings</h2>
      <CallList type="Ended" />
    </section>
  );
};

export default PreviousPage;
