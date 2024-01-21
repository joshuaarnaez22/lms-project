"use client";
import React, { useState } from "react";

import ConfirmModal from "@/components/shared/confirm-modal";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/lib/api";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/store/confetti";

interface CourseActionsProps {
  isPublished: boolean;
  disabled: number;
  courseId: string;
}

const CourseActions = ({
  isPublished,
  disabled,
  courseId,
}: CourseActionsProps) => {
  const router = useRouter();
  const { onOpen } = useConfettiStore();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  const confirm = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`${courseApi}/${courseId}`);
      router.push(`/teacher/courses`);
      router.refresh();
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const pubishToogle = async () => {
    try {
      setPublishLoading(true);

      if (isPublished) {
        await axios.patch(`${courseApi}/${courseId}/unpublish-course`);
        toast.success("Course unpublish successfully");
      } else {
        await axios.patch(`${courseApi}/${courseId}/publish-course`);
        onOpen();
        toast.success("Course publish successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
      setPublishLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled === 6 ? false : true || publishLoading}
        onClick={pubishToogle}
        className="flex items-center gap-2"
      >
        <div>{isPublished ? "Unpublish" : "Publish"}</div>
        {publishLoading && <Loader2 className=" animate-spin w-4 h-4" />}
      </Button>
      <ConfirmModal
        onConfirm={confirm}
        message="This action cannot be undone. This will permanently delete your Course and Chapters and remove your data from our servers."
      >
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          disabled={deleteLoading}
        >
          <Trash />
          {deleteLoading && <Loader2 className=" animate-spin w-4 h-4" />}
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
