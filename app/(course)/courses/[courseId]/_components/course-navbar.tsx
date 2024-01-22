import NavbarRoutes from "@/components/shared/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSidebar from "./course-mobile-sidebar-";

type CourseWithProgressCategory = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};
const CourseNavbar = ({
  course,
  progressCount,
}: CourseWithProgressCategory) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
