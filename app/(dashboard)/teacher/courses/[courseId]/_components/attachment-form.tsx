"use client";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/lib/api";
import { CoursePropsAttachment } from "@/lib/type";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "@/components/shared/file-upload";

const AttachmentForm = ({ courseId, attachments }: CoursePropsAttachment) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const router = useRouter();

  const toogleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = async ({ url }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}/attachments`, {
        url,
      });
      router.refresh();
      toogleEdit();
      toast.success("Course attachments updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeleteId(id);
      await axios.delete(`${courseApi}/${courseId}/attachments/${id}`);
      toast.success("Course attachments deleted successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold mb-2">
        <h3>Course Attachment</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Attachment
            </>
          )}
        </Button>
      </div>
      {!isEdit && (
        <>
          {attachments?.length === 0 && (
            <p className="text-sm text-slate-500 italic mt-2">
              No attachments yet
            </p>
          )}
          {attachments?.length >= 0 &&
            attachments?.map((attachment) => (
              <div
                key={attachment.id}
                className="flex item-center justify-between w-full bg-sky-200 border text-sky-700 rounded-md mb-4 p-2"
              >
                <div className="flex">
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm text-slate-500">{attachment.name}</p>
                </div>

                <div>
                  {deleteId === attachment.id && (
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  )}
                  {deleteId !== attachment.id && (
                    <X
                      className="w-4 h-4 hover:opacity-75 transition ml-2  cursor-pointer"
                      onClick={() => onDelete(attachment.id)}
                    />
                  )}
                </div>
              </div>
            ))}
        </>
      )}
      {isEdit && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
                toast.success("Image saved successfully");
              }
            }}
          />

          <div className="text-sm text-muted-foreground mt-4">
            Add anything your student might have to complete
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
