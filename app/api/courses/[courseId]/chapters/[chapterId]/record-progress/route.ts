import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { getCourseProgress } from "@/actions/get-course-progress";

export async function PUT(
  req: NextRequest,
  { params }: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { isCompleted } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.userProgress.upsert({
      where: {
        chapterId_userId: {
          chapterId: params.chapterId,
          userId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        isCompleted: true,
        userId,
        chapterId: params.chapterId,
      },
    });

    const progressPercentage = await getCourseProgress(userId, params.courseId);
    console.log(progressPercentage);

    return NextResponse.json({
      message: `${
        progressPercentage === 100 ? "Course completed" : "Not complete"
      }`,
    });
  } catch (error) {
    console.log("UserProgress record error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
