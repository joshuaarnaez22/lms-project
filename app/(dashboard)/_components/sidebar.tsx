import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overf bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="w-full flex flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
