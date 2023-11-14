import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...value,
      },
    });

    return NextResponse.json({ message: "Course title updated" });
  } catch (error) {
    console.log("creating courses error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
