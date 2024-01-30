import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/shared/banner";
import VideoPlayer from "./_components/video-player";
import EnrollButton from "./_components/enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/shared/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  return {
    title: course?.title,
    metadataBase: new URL("https://lms-project-five.vercel.app/"),
    description: "",
    openGraph: {
      images: [
        {
          url: course?.imageUrl!,
          width: 800,
          height: 600,
        },
      ],
      description: "Lms platform",
      url: "https://lms-project-five.vercel.app",
      siteName: "Next.js",
      locale: "en_US",
      type: "website",
    },
  };
}

const CourseChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const {
  //   userProgress,
  //   muxData,
  //   chapter,
  //   course,
  //   attachments,
  //   nextChapter,
  //   purchase,
  // } = await getChapter({ userId, ...params });

  // if (!chapter || !course) {
  //   return redirect("/");
  // }

  // const isLocked = !chapter.isFree && !purchase;
  // const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <h1>hello</h1>
    // <div>
    //   {userProgress?.isCompleted && (
    //     <Banner
    //       label="You have already completed this chapter."
    //       type="success"
    //     />
    //   )}
    //   {isLocked && (
    //     <Banner
    //       label="You need to purchase this course to watch this chapter."
    //       type="warning"
    //     />
    //   )}
    //   <div className="flex flex-col max-w-4xl mx-auto pb-20">
    //     <div className="p-4">
    //       <VideoPlayer
    //         chapterId={chapter.id}
    //         title={chapter.title}
    //         courseId={params.courseId}
    //         playbackId={muxData?.playbackId!}
    //         isLocked={isLocked}
    //         completeOnEnd={completeOnEnd}
    //         nextChapter={nextChapter?.id}
    //       />
    //     </div>
    //     <div>
    //       <div className="flex p-4  flex-col items-center justify-center lg:flex-row lg:justify-between w-full ">
    //         <h2 className=" text-2xl font-medium mb-2">{chapter.title}</h2>
    //         {purchase ? (
    //           <CourseProgressButton
    //             chapterId={params.chapterId}
    //             courseId={params.courseId}
    //             nextChapterId={nextChapter?.id}
    //             isComplete={userProgress?.isCompleted}
    //           />
    //         ) : (
    //           <div className="w-full lg:w-auto">
    //             <EnrollButton price={course.price!} courseId={course.id} />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <Separator />
    //     <div>
    //       <Preview value={chapter.description!} />
    //     </div>
    //     <div>
    //       {!!attachments.length && (
    //         <div className="p-4">
    //           {attachments.map((attachment) => (
    //             <a
    //               href={attachment.url!}
    //               key={attachment.id}
    //               target="_blank"
    //               className="flex items-center p-3 w-full bg-sky-200 border hover:bg-sky-700 transition rounded-md"
    //             >
    //               <File className="w-4 h-4" />
    //               <p className=" line-clamp-1">{attachment.name}</p>
    //             </a>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default CourseChapterIdPage;
