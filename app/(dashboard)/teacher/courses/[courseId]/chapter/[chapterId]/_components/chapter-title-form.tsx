"use client";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import FormInput from "@/components/ui/form-input";
import { courseApi } from "@/lib/api";
import { ChapterTitleSchema, CreateCourseSchema } from "@/lib/schema";
import { ChatperPropsTitle, CoursePropsTitle } from "@/lib/type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TitleFormChapter = ({
  courseId,
  title,
  chapterId,
}: ChatperPropsTitle) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(ChapterTitleSchema),
    defaultValues: {
      title: title || "",
    },
  });

  const { handleSubmit, reset, formState, setValue } = methods;
  const { isSubmitting } = formState;

  const toogleEdit = () => {
    setIsEdit(!isEdit);
    setValue("title", title, { shouldValidate: true });
  };

  const onSubmit = async ({ title }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}/chapters/${chapterId}`, {
        value: {
          title,
        },
      });
      router.refresh();
      toogleEdit();
      toast.success("Chapter title updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      reset();
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Chapter Title</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit Chapter Title</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit && <p className="text-sm mt-2">{title}</p>}
      {isEdit && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormInput
              type="text"
              placeholder="e.g Introduction to the subject"
              name="title"
            />
            <Button type="submit" disabled={isSubmitting}>
              <div className="flex items-center gap-1">
                Submit
                {isSubmitting && <Loader2 className=" animate-spin w-4 h-4" />}
              </div>
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default TitleFormChapter;
