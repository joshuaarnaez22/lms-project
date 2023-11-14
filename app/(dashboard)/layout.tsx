import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className=" h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden lg:flex h-full w-56 flex-col inset-y-0 left-0 z-50 fixed">
        <Sidebar />
      </div>
      <div className=" pt-[80px] lg:ml-56 h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
