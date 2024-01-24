import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
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
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  return redirect(
    `/courses/${params.courseId}/chapters/${course?.chapter[0].id}`
  );
};

export default CourseIdPage;
