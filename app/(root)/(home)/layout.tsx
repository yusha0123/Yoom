import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-[100dvh] flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-16">
          <div className="size-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
