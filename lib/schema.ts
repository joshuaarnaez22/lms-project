import * as yup from "yup";

export const CreateCourseSchema = yup.object().shape({
  title: yup.string().required("Course Title is required"),
});

export const CourseTitleSchema = yup.object().shape({
  title: yup.string().required("Course Title is required"),
});

export const CourseDescriptionSchema = yup.object().shape({
  description: yup.string().required("Course description is required"),
});

export const CourseImageUrlSchema = yup.object().shape({
  imageUrl: yup.string().required("Image is required"),
});

export const CourseCategorySchema = yup.object().shape({
  category: yup.string().required("Category is required"),
});

export const CoursePriceSchema = yup.object().shape({
  price: yup.number().typeError("Amount must be a number").optional(),
});

export const CourseChapterTitlechema = yup.object().shape({
  title: yup.string().required("Course Title is required"),
});
