import React from "react";
import prisma from "@/lib/prisma";
import Categories from "./_components/categories";
import SearchInput from "@/components/ui/search-input";
import { auth } from "@clerk/nextjs";
import { getCourses } from "@/actions/get-courses";
import { redirect } from "next/navigation";
import CourseList from "./_components/course-list";

interface SearchParams {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const Search = async ({ searchParams }: SearchParams) => {
  const { userId } = auth();

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!userId) {
    return redirect("/");
  }

  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <div className="mt-6">
          <CourseList items={courses} />
        </div>
      </div>
    </>
  );
};

export default Search;
