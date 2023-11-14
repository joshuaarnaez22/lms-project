import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: { id: params.courseId, userId: userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const findlastChapter = await prisma.chapter.findFirst({
      where: { courseId: params.courseId },
      orderBy: {
        position: "desc",
      },
    });

    const position = findlastChapter ? findlastChapter.position + 1 : 1;

    await prisma.chapter.create({
      data: {
        title: value.title,
        position,
        courseId: params.courseId,
      },
    });

    return NextResponse.json({ message: "Course chapter added" });
  } catch (error) {
    console.log("Chapter Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
