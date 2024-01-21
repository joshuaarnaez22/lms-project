import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";

type CourseWithProgressCategory = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};
const CourseSidebar = ({
  course,
  progressCount,
}: CourseWithProgressCategory) => {
  return <div>CourseSidebar</div>;
};

export default CourseSidebar;
