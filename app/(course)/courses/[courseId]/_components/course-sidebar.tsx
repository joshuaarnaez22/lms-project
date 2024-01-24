import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import prisma from "@/lib/prisma";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/shared/course-progress";

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

  return (
    <div className="h-full border-r flex flex-col shadow-sm overflow-y-auto w-full">
      <div className="p-8 border-b flex flex-col">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-6">
            <CourseProgress
              value={progressCount}
              variant={progressCount === 100 ? "success" : "default"}
              size="default"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {course.chapter.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            isCompleted={!!chapter?.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
