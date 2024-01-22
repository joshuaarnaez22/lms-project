import React from "react";
import prisma from "@/lib/prisma";

const CourseChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string };
}) => {
  console.log(params.chapterId);

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
  });

  console.log(chapter);

  return <div>{chapter?.title}</div>;
};

export default CourseChapterIdPage;
