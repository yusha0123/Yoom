import ModalProvider from "@/providers/modal-provider";
import StreamClientProvider from "@/providers/stream-client-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>
        {children}
        <ModalProvider />
      </StreamClientProvider>
    </main>
  );
};

export default RootLayout;
