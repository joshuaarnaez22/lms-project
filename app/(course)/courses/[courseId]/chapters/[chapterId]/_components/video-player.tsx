"use client";
import React, { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player/themes/classic";
import { twMerge } from "tailwind-merge";
import { useConfettiStore } from "@/store/confetti";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  playbackId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  nextChapter?: string;
}

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  playbackId,
  isLocked,
  completeOnEnd,
  nextChapter,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const { onOpen } = useConfettiStore();
  const router = useRouter();

  const onEnded = async () => {
    try {
      const progressUpdate = await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/record-progress`,
        {
          isCompleted: true,
        }
      );

      if (progressUpdate.data.message === "Course completed" && completeOnEnd) {
        onOpen();
      }
      if (
        progressUpdate.data.message === "Not complete" &&
        completeOnEnd &&
        nextChapter
      ) {
        router.push(`/courses/${courseId}/chapters/${nextChapter}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className=" absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={twMerge(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnded}
          autoPlay
          playbackId={playbackId}
          theme="classic"
        />
      )}
      {isLocked && (
        <div className=" absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8 " />
          <p className="text-sm font-medium">This chapter is locked</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
