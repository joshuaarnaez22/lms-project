import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { list } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: { id: params.courseId, userId: userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });
    const queries = list.map((item: any) => {
      return prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    });

    await prisma.$transaction(queries);

    return NextResponse.json({ message: "Course chapter position updated" });
  } catch (error) {
    console.log("Chapter Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
