"use client";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/lib/api";
import { CourseCategorySchema } from "@/lib/schema";
import { CoursePropsCategory } from "@/lib/type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

const CategoryForm = ({
  courseId,
  options,
  selectedCategory,
}: CoursePropsCategory) => {
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [courseCategory, setcourseCategory] = useState(selectedCategory);
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CourseCategorySchema),
    defaultValues: {
      category: selectedCategory || "",
    },
  });

  const { reset, handleSubmit, setValue, formState } = methods;
  const { isSubmitting } = formState;

  const toogleEdit = () => {
    reset();
    setIsEdit(!isEdit);
    setValue("category", courseCategory || "");
  };

  const onSubmit = async ({ category }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}`, {
        value: { categoryId },
      });
      toast.success("Category updated successfully");
      router.refresh();
      toogleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const selectedChange = (value: string, id: string) => {
    setcourseCategory(value);
    setCategoryId(id);
    setValue("category", value || "", { shouldValidate: true });
  };
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Course Category</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={() => toogleEdit()}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit Category</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit && (
        <p
          className={cn(
            "text-sm mt-2",
            !selectedCategory && "text-slate-500 italic"
          )}
        >
          {!selectedCategory ? "No category" : selectedCategory}
        </p>
      )}
      {isEdit && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <Combobox
              name="category"
              options={options.map((option) => ({
                id: option.id,
                label: option.name,
                value: option.name,
              }))}
              value={courseCategory}
              onChange={selectedChange}
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

export default CategoryForm;
