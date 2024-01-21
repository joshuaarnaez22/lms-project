import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import prisma from "@/lib/prisma";

type CourseWithProgressCategory = {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

const CourseSidebar = async ({
  course,
  progressCount,
}: CourseWithProgressCategory) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await prisma.purchase.findUnique({
    where: {
      courseId_userId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return <div>CourseSidebar</div>;
};

export default CourseSidebar;
