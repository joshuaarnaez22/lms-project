import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const NavbarSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden hover:opacity-75 pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
