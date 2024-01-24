import prisma from "@/lib/prisma";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterProps) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        courseId_userId: {
          userId,
          courseId,
        },
      },
    });

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
        id: true,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        muxData: true,
      },
    });

    if (!chapter || !course?.id) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter?.isFree || purchase) {
      muxData = await prisma.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        chapterId_userId: {
          chapterId,
          userId,
        },
      },
    });

    return {
      userProgress,
      muxData,
      chapter,
      course,
      attachments,
      nextChapter,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]");
    return {
      userProgress: null,
      muxData: null,
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      purchase: null,
    };
  }
};
