import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Courses = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/courses/create">
        <Button>Create Course</Button>
      </Link>
    </div>
  );
};

export default Courses;
