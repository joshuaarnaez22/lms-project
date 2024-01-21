import { Attachment, Chapter, MuxData } from "@prisma/client";

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
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
  courseId: string;
};

export type ChatperPropsTitle = {
  courseId: string;
  title: string;
  chapterId: string;
};

export type ChapterPropsDescription = {
  courseId: string;
  description: string | null;
  chapterId: string;
};

export type EditorProps = {
  onChange?: (value: string) => void;
  value: string;
};

export type ChapterPropsAccessSettings = {
  courseId: string;
  isFree: boolean;
  chapterId: string;
};

export type ChapterPropsVideo = {
  courseId: string;
  chapter: chapter & { muxData?: MuxData | null };
  chapterId;
};
