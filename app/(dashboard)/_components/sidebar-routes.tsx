"use client";
import { Compass, Layout, List, BarChart } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  { Icon: Layout, href: "/", label: "Dashboard" },
  { Icon: Compass, href: "/search", label: "Browse" },
];

const teacherRoutes = [
  { Icon: List, href: "/teacher/courses", label: "Courses" },
  { Icon: BarChart, href: "/teacher/analytics", label: "Analytics" },
];
const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className=" flex flex-col w-full  h-full">
      {routes.map((items) => (
        <div key={items.href} className="h-full">
          <SidebarItem {...items} />
        </div>
      ))}
    </div>
  );
};

export default SidebarRoutes;
