"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { courseApi } from "@/lib/api";
import { CourseChapterTitlechema } from "@/lib/schema";
import { CoursePropsChapter } from "@/lib/type";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ChapterList from "./chapters-list";

const ChapterForm = ({ courseId, chapter }: CoursePropsChapter) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CourseChapterTitlechema),
    defaultValues: {
      title: "",
    },
  });

  const { setValue, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const toogleEdit = (value?: string) => {
    setIsCreating(!isCreating);
    setValue("title", value || "");
  };

  const onSubmit = async ({ title }: any) => {
    try {
      await axios.post(`${courseApi}/${courseId}/chapters`, {
        value: { title },
      });

      router.refresh();
      toogleEdit();
      toast.success("Course Chapter updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`${courseApi}/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      // router.refresh();
      toast.success("Course reorder successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string, title: string) => {
    toogleEdit(title);
    console.log(id);
  };

  return (
    <div className="relative mt-6 bg-slate-100 rounded-md p-4 ">
      {isUpdating && (
        <div className=" absolute top-0 right-0 rounded-md h-full w-full flex justify-center items-center bg-slate-500/20">
          <Loader2 className=" animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="flex justify-between items-center font-bold mb-4">
        <h3>Course Chapters</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={() => toogleEdit()}
        >
          {isCreating && <>Cancel</>}
          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <h3> Add a chapter</h3>
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <Input type="text" placeholder="Chapter title" name="title" />

            <Button type="submit" disabled={isSubmitting}>
              <div className="flex items-center gap-1">
                Submit
                {isSubmitting && <Loader2 className=" animate-spin w-4 h-4" />}
              </div>
            </Button>
          </form>
        </FormProvider>
      )}
      {!isCreating && !chapter.length && (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              !chapter.length && "text-slate-500 italic"
            )}
          >
            No chapters
          </div>
        </>
      )}
      {!isCreating && (
        <ChapterList onEdit={onEdit} onReorder={onReorder} items={chapter} />
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
