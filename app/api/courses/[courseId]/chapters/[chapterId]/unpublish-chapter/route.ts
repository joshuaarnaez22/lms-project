import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: { id: params.courseId, userId: userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json({
      message: "Chapter published",
    });
  } catch (error) {
    console.log("Publish Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
