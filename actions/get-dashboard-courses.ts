import prisma from "@/lib/prisma";
import { getCourseProgress } from "./get-course-progress";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithProgress = Course & {
  progress: number | null;
  category: Category | null;
  chapter: Chapter[];
};
export const getDashboardCourse = async (userId: string) => {
  try {
    const purchasedCourses = await prisma.purchase.findMany({
      where: { userId },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = (await purchasedCourses.map(
      (purchaseCourse) => purchaseCourse.course
    )) as CourseWithProgress[];

    for (let course of courses) {
      const progress = await getCourseProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourse = courses.filter((course) => course.progress === 100);
    const incompleteCourse = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourse,
      incompleteCourse,
    };
  } catch (error) {
    return {
      completedCourse: [],
      incompleteCourse: [],
    };
    console.log("[Error in dashboard]");
  }
};
