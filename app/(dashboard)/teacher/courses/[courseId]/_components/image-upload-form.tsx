"use client";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/lib/api";
import { CourseImageUrlSchema } from "@/lib/schema";
import { CoursePropsImageUrl } from "@/lib/type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import FileUpload from "@/components/shared/file-upload";

const ImageUploadForm = ({ courseId, imageUrl }: CoursePropsImageUrl) => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CourseImageUrlSchema),
    defaultValues: {
      imageUrl: imageUrl || "",
    },
  });

  const { setValue } = methods;

  const toogleEdit = () => {
    setIsEdit(!isEdit);
    setValue("imageUrl", imageUrl || "");
  };

  const onSubmit = async ({ imageUrl }: any) => {
    try {
      await axios.patch(`${courseApi}/${courseId}`, {
        value: { imageUrl },
      });
      router.refresh();
      toogleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 ">
      <div className="flex justify-between items-center font-bold ">
        <h3>Course Image</h3>
        <Button
          variant="ghost"
          className="flex items-center justify-center font-bold"
          onClick={toogleEdit}
        >
          {isEdit && <>Cancel</>}
          {!isEdit && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
          {!isEdit && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <h3> Edit Image</h3>
            </>
          )}
        </Button>
      </div>
      {!isEdit &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Image upload"
              fill
              className=" object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}
      {isEdit && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
                toast.success("Image saved successfully");
              }
            }}
          />

          <div className="text-sm text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
