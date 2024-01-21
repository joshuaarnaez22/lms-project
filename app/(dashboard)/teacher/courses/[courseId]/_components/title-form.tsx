"use client";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { courseApi } from "@/lib/api";
import { CreateCourseSchema } from "@/lib/schema";
import { CoursePropsTitle } from "@/lib/type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TitleForm = ({ courseId, title }: CoursePropsTitle) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CreateCourseSchema),
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
      await axios.patch(`${courseApi}/${courseId}`, { value: { title } });
      router.refresh();
      toogleEdit();
      toast.success("Course title updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      reset();
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Course Title</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit Title</h3>
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
              placeholder="e.g Advanced web developement"
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

export default TitleForm;
