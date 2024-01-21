import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";
import _ from "lodash";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Eye, Video } from "lucide-react";
import TitleFormChapter from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/shared/banner";
import ChapterActions from "./_components/chapter-actions";

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

  return (
    <>
      {!chapter.isPublished ? (
        <Banner
          label="This chapter is unpublished it will not visible in the course"
          type="warning"
        />
      ) : (
        <Banner label="This chapter is visible in the course" type="success" />
      )}

      <div className="p-6">
        <div>
          <Link
            className="flex justify-start items-center text-sm hover:opacity-75 w-fit p-2"
            href={`/teacher/courses/${params.courseId}`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center mt-6 justify-between">
            <div>
              <div className="flex flex-col gap-y-2 font-medium">
                <h1 className="text-2xl ">Chapter Creation</h1>
                <span className="">
                  Complete all fields {completedFields}/3
                </span>
              </div>
            </div>
            <ChapterActions
              isPublished={chapter.isPublished}
              disabled={completedFields}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
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
            <div className="flex items-center ">
              <div className="mr-2 h-14 w-14 rounded-full bg-sky-400 flex justify-center items-center ">
                <Eye className="h-12 w-12 p-2 text-sky-800" />
              </div>
              <h2 className="text-xl">Access Settings</h2>
            </div>

            <ChapterAccessForm
              isFree={chapter.isFree}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div className="mr-2 h-14 w-14 rounded-full bg-sky-400 flex justify-center items-center ">
                <Video className="h-12 w-12 p-2 text-sky-800" />
              </div>
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
              chapter={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterId;
