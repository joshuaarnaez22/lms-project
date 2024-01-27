"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "../ui/search-input";
import { isTeacher } from "@/actions/teacher";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursesPage = pathname?.includes("/courses");

  const isSearch = pathname === "/search";
  return (
    <>
      <div className="hidden md:block">{isSearch && <SearchInput />}</div>
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursesPage ? (
          <Link href="/">
            <Button variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button variant="ghost">Teacher Mode</Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
