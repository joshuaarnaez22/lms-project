import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
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

    const chapters = await prisma.chapter.findMany({
      where: {
        courseId: params.courseId,
      },
      include: {
        muxData: true,
      },
    });

    if (chapters.length) {
      const muxArray = chapters.map((chapter) => {
        if (chapter?.muxData) {
          return Video.Assets.del(chapter.muxData.assetId).catch(() => {
            console.log("video not found");
          });
        }
        return Promise.resolve();
      });
      await Promise.all(muxArray).catch(() => {
        console.log("some videos not found");
      });
    }

    await prisma.course.delete({
      where: {
        id: params.courseId,
      },
    });
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("deleting course error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
