// import { Course } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const revalidate = 0;
const CourseTable = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const courses = await prisma.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CourseTable;
