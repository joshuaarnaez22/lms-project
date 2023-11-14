"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { courseApi } from "@/lib/api";
import { CreateCourseSchema } from "@/lib/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import toast from "react-hot-toast";

const CreateCouse = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CreateCourseSchema),
  });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async ({ title }: any) => {
    try {
      const response = await axios.post(courseApi, { title });

      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      reset();
    }
  };
  return (
    <div className=" max-w-5xl mx-auto p-6 h-full flex items-center justify-center">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Dont worry, you can change
          this later.
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="e.g Advanced web developement"
                name="title"
              />
              <p className="text-md text-slate-500">
                What will you teach in this course.
              </p>
            </div>
            <div className="space-x-2">
              <Link href="/teacher/courses">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateCouse;
