"use client";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/store/confetti";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isComplete?: boolean;
  nextChapterId?: string;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isComplete,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const { onOpen } = useConfettiStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const Icon = !isComplete ? CheckCircle : XCircle;

  const onClick = async () => {
    try {
      setLoading(true);
      const progressUpdate = await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/record-progress`,
        {
          isCompleted: !isComplete,
        }
      );

      if (progressUpdate.data.message === "Course completed") {
        onOpen();
      }
      if (
        progressUpdate.data.message === "Not complete" &&
        !isComplete &&
        nextChapterId
      ) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      toast.success(`Progress updated`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className=" flex items-center justify-center gap-x-2 w-full lg:w-auto"
      onClick={onClick}
      size="sm"
      disabled={loading}
      variant={isComplete ? "success" : "outline"}
    >
      {isComplete ? "Completed" : "Mark as complete"}

      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CourseProgressButton;
