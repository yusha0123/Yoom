import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[100dvh] flex items-center justify-center w-full">
      {children}
    </main>
  );
};

export default AuthLayout;
