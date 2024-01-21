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
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, value } = await req.json();

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
        ...value,
      },
    });

    if (value?.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: { chapterId: params.chapterId },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }

      const assets = await Video.Assets.create({
        input: value.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await prisma.muxData.create({
        data: {
          chapterId: params.chapterId,
          playbackId: assets.playback_ids?.[0].id,
          assetId: assets.id,
        },
      });
    }

    return NextResponse.json({ message: "Course chapter added" });
  } catch (error) {
    console.log("Chapter Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
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

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        muxData: true,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter?.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: { chapterId: params.chapterId },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId).catch(() => {
          console.log("video not found");
        });
        await prisma.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }
    }

    await prisma.chapter.delete({
      where: { id: params.chapterId },
    });

    const publishedChapterInCourse = await prisma.chapter.findMany({
      where: {
        id: params.chapterId,
        isPublished: true,
      },
    });

    if (!publishedChapterInCourse.length) {
      await prisma.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({
      message: "Course chapter deleted",
    });
  } catch (error) {
    console.log("Chapter Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
