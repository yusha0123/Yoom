import ModalProvider from "@/providers/modal-provider";
import StreamClientProvider from "@/providers/stream-client-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StreamClientProvider>
      {children}
      <ModalProvider />
    </StreamClientProvider>
  );
};

export default RootLayout;
