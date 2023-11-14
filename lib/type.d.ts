import { Attachment, Chapter } from "@prisma/client";

export type InputProps = {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder: string;
  name: string;
  labelText?: string;
  numType?: string;
};

export type CoursePropsTitle = {
  courseId: string;
  title: string;
};
export type CoursePropsDescription = {
  courseId: string;
  description: string | null;
};

export type CoursePropsPrice = {
  courseId: string;
  price: number | null;
};

export type CoursePropsImageUrl = {
  courseId: string;
  imageUrl?: string | null;
};
export type CoursePropsImageUrl = {
  courseId: string;
  imageUrl?: string | null;
};

export type CoursePropsAttachment = {
  courseId: string;
  attachments: Attachment[];
};

export interface ComboboxProps {
  options: {
    id: string;
    label: string;
    value: string;
  }[];
  value?: string;
  name: string;
  onChange: (value: string, id: string) => void;
}

export type CoursePropsCategory = {
  courseId: string;
  selectedCategory?: string;
  options: {
    id: string;
    name: string;
  }[];
};

export type CoursePropsChapter = {
  courseId: string;
  title?: string;
  chapter: Chapter[];
};

export type ChapterListProps = {
  onEdit: (id: string, title: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
};
