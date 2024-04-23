import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex w-full min-h-[100dvh] flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8 md:px-10 xl:px-12">
          {children}
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
