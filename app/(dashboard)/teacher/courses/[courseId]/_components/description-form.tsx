"use client";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { courseApi } from "@/lib/api";
import { CourseDescriptionSchema } from "@/lib/schema";
import { CoursePropsDescription } from "@/lib/type";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DescriptionForm = ({ courseId, description }: CoursePropsDescription) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CourseDescriptionSchema),
    defaultValues: {
      description: description || "",
    },
  });

  const { handleSubmit, reset, formState, setValue } = methods;
  const { isSubmitting } = formState;

  const toogleEdit = () => {
    reset();
    setIsEdit(!isEdit);
    setValue("description", description || "");
  };

  const onSubmit = async ({ description }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}`, { value: { description } });
      router.refresh();
      toogleEdit();
      toast.success("Course description updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      reset();
    }
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
              <h3> Edit Description</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit && (
        <p
          className={cn(
            "text-sm mt-2",
            !description && "text-slate-500 italic"
          )}
        >
          {!description ? "No description" : description}
        </p>
      )}
      {isEdit && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <Textarea
              placeholder="Enter the course description here..."
              name="description"
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

export default DescriptionForm;
