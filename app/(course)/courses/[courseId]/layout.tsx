import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourseProgress } from "@/actions/get-course-progress";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CorusePageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getCourseProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className=" h-[80px] lg:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar progressCount={progressCount} course={course} />
      </div>
      <div className="hidden lg:flex h-full z-50 fixed w-80 inset-y-0 ">
        <CourseSidebar progressCount={progressCount} course={course} />
      </div>
      <main className="lg:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CorusePageLayout;
