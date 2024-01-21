import prisma from "@/lib/prisma";
import { getCourseProgress } from "./get-course-progress";

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({ userId, title, categoryId }: GetCourses) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress = await Promise.all(
      courses.map(async (course) => {
        if (course.purchase.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }
        const progressPercentage = await getCourseProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );
    return courseWithProgress;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return [];
  }
};
