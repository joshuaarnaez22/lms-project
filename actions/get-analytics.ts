import prisma from "@/lib/prisma";
import { Course, Purchase } from "@prisma/client";
import _ from "lodash";

type groupPurchasedCourseByIdProps = Purchase & {
  course: Course;
};

const groupPurchasedCourseById = (courses: groupPurchasedCourseByIdProps[]) => {
  const groupedData = _.groupBy(courses, "courseId");

  return groupedData;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchase = await prisma.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });
    const groupedDataByCourseId = groupPurchasedCourseById(purchase);

    const data = Object.entries(groupedDataByCourseId).map(([, entries]) => {
      let total = 0;
      const name = entries[0].course.title;
      for (const entry of entries) {
        total += entry.course.price!;
      }
      return {
        total,
        name,
      };
    });

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchase.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]");
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
