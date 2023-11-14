import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await prisma.course.findUnique({
      where: { id: params.courseId, userId: userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    await prisma.attachment.create({
      data: {
        name: url.split("/").pop(),
        courseId: params.courseId,
        url,
      },
    });

    return NextResponse.json({ message: "Course title updated" });
  } catch (error) {
    console.log("Attachments Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
