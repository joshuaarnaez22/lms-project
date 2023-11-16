import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";
import _ from "lodash";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import TitleFormChapter from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) return redirect("/");

  const requiredFields = [
    !!chapter?.title,
    !!chapter?.description,
    !!chapter?.videoUrl,
  ];
  const completedFields = _.countBy(requiredFields).true || 0;
  console.log(completedFields);

  return (
    <div className="p-6">
      <div>
        <Link
          className="flex justify-start items-center text-sm hover:opacity-75"
          href={`/teacher/courses/${params.courseId}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to course setup
        </Link>
        <div className="flex items-center mt-6">
          <div>
            <div className="flex flex-col gap-y-2 font-medium">
              <h1 className="text-2xl ">Chapter Creation</h1>
              <span className="">Complete all fields {completedFields}/3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="mr-2 h-14 w-14 rounded-full bg-sky-400 flex justify-center items-center ">
              <LayoutDashboard className="h-12 w-12 p-2 text-sky-800" />
            </div>
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <div>
            <TitleFormChapter
              title={chapter.title}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              description={chapter.description}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterId;
