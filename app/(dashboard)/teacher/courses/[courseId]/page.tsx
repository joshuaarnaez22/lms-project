import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  CircleDollarSign,
  File,
} from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import _ from "lodash";
import ImageUploadForm from "./_components/image-upload-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";

const CourseId = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const course = await prisma.course.findUnique({
    where: { id: params.courseId, userId },
    include: {
      category: true,
      chapter: {
        orderBy: {
          position: "asc",
        },
      },
      attachment: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  console.log(course);

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    !!course?.title,
    !!course?.description,
    !!course?.imageUrl,
    !!course?.category,
    !!course?.price,
    !!course?.chapter.some((chapter) => chapter.isPublished),
  ];

  const completedFields = _.countBy(requiredFields).true || 0;

  if (!course) return redirect("/");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2 font-medium">
          <h1 className="text-2xl ">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all {`${completedFields}/6`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex  items-center justify-start mt-16">
            <div className="mr-6 h-14 w-14 rounded-full bg-sky-400 flex justify-center items-center ">
              <LayoutDashboard className="h-12 w-12 p-2 text-sky-800" />
            </div>
            <h1 className="text-2xl font-medium ">Customize your course</h1>
          </div>
          <div>
            <TitleForm title={course.title} courseId={course.id} />
            <DescriptionForm
              description={course.description}
              courseId={course.id}
            />
            <ImageUploadForm imageUrl={course.imageUrl} courseId={course.id} />
            <CategoryForm
              courseId={course.id}
              selectedCategory={course.category?.name}
              options={categories}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-start mt-16">
            <div className="mr-6 h-14 w-14 rounded-full bg-sky-400 flex justify-center items-center ">
              <ListChecks className="h-12 w-12 p-2 text-sky-800" />
            </div>
            <h1 className="text-2xl font-medium ">Course chapters</h1>
          </div>
          <div>
            <ChapterForm courseId={course.id} chapter={course.chapter} />
          </div>
          <div className="flex items-center justify-start">
            <div className="mr-6 h-14 w-14 rounded-full bg-sky-300 flex justify-center items-center ">
              <CircleDollarSign className="h-12 w-12 p-2 text-sky-800" />
            </div>
            <h1 className="text-2xl font-medium ">Sell your course</h1>
          </div>
          <div>
            <PriceForm price={course.price} courseId={course.id} />
          </div>
          <div className="flex items-center justify-start mt-10">
            <div className="mr-6 h-14 w-14 rounded-full bg-sky-300 flex justify-center items-center ">
              <File className="h-12 w-12 p-2 text-sky-800" />
            </div>
            <h1 className="text-2xl font-medium ">Resources & Attachments</h1>
          </div>
          <AttachmentForm
            attachments={course.attachment}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseId;
