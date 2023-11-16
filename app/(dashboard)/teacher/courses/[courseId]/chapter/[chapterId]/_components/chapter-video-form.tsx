"use client";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/lib/api";
import { ChapterVideoSchema, CourseImageUrlSchema } from "@/lib/schema";
import { ChapterPropsVideo, CoursePropsImageUrl } from "@/lib/type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import FileUpload from "@/components/shared/file-upload";
import MuxPlayer from "@mux/mux-player-react";
const ChapterVideoForm = ({
  courseId,
  chapter,
  chapterId,
}: ChapterPropsVideo) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(ChapterVideoSchema),
    // defaultValues: {
    //   videoUrl: "" ,
    // },
  });

  const { setValue } = methods;

  const toogleEdit = () => {
    setIsEdit(!isEdit);
    // setValue("imageUrl", imageUrl || "");
  };

  const onSubmit = async ({ videoUrl }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}/chapters/${chapterId}`, {
        value: { videoUrl },
      });
      router.refresh();
      toogleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Chapter Video</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && !chapter.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEdit && chapter.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit video</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit &&
        (!chapter.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={chapter.muxData.playbackId} />
          </div>
        ))}
      {isEdit && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
                toast.success("Video saved successfully");
              }
            }}
          />

          <div className="text-sm text-muted-foreground mt-4">
            Upload this chapters video
          </div>
        </div>
      )}
      {chapter.videoUrl && !isEdit && (
        <div className="text-xs text-muted-foreground gap-x-2">
          Videos can take a few minutes to process. Refresh the page of video
          does not appear
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
