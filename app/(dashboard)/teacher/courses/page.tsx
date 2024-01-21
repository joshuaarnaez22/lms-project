import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import CourseTable from "./_components/course-table/page";

const Courses = () => {
  return (
    <div className="p-6">
      <CourseTable />
    </div>
  );
};

export default Courses;
