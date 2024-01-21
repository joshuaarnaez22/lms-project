import { Category, Course, Purchase } from "@prisma/client";
import React from "react";
import CourseCard from "./course-card";

type CourseWithProgressCategory = Course & {
  progress: number | null;
  category: Category | null;
  chapter: {
    id: string;
  }[];
  purchase: Purchase[];
};

interface CourseListProps {
  items: CourseWithProgressCategory[];
}
const CourseList = ({ items }: CourseListProps) => {
  return (
    <div>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CourseList;
