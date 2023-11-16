"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/textarea";
import { courseApi } from "@/lib/api";
import {
  ChapterAccessSettingsSchema,
  CourseDescriptionSchema,
} from "@/lib/schema";
import { ChapterPropsAccessSettings, CoursePropsDescription } from "@/lib/type";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChapterAccessForm = ({
  courseId,
  isFree,
  chapterId,
}: ChapterPropsAccessSettings) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(ChapterAccessSettingsSchema),
    defaultValues: {
      isFree: isFree,
    },
  });

  const [free, setFree] = useState(isFree); // useState since having an issue of setting

  const { handleSubmit, reset, formState, setValue } = methods;
  const { isSubmitting } = formState;

  const toogleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = async ({ isFree }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}/chapters/${chapterId}`, {
        value: { isFree },
      });
      router.refresh();
      toogleEdit();
      toast.success("Course access updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      reset();
    }
  };

  const onChange = (checked: boolean) => {
    setValue("isFree", checked);
    setFree(checked);
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Course Description</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit access</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit && (
        <p className={cn("text-sm mt-2", !isFree && "text-slate-500 italic")}>
          {!isFree
            ? "This chapter is not free"
            : "This chapter is free for preview"}
        </p>
      )}
      {isEdit && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <div className="flex items-center gap-x-2">
              <Checkbox checked={free} onCheckedChange={onChange} />
              <p className="leading-none ">
                Check this box if you want to make this chapter free for preview
              </p>
            </div>
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

export default ChapterAccessForm;
