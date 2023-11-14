import React from "react";
import NavbarSidebar from "./navbar-sidebar";
import NavbarRoutes from "@/components/shared/navbar-routes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white">
      <NavbarSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
