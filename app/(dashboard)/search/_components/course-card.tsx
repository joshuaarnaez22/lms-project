import React from "react";
import { Category, Purchase, Course } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/price-format";
import CourseProgress from "@/components/shared/course-progress";
type CourseWithProgressCategory = Course & {
  progress: number | null;
  category: Category | null;
  chapter: {
    id: string;
  }[];
  purchase: Purchase[];
};

interface CourseCardProps {
  item: CourseWithProgressCategory;
}

const CourseCard = ({ item }: CourseCardProps) => {
  return (
    <Link href={`/courses/${item.id}`}>
      <div className="group transition hover:shadow-md rounded-lg h-full p-3 overflow-x-hidden border">
        <div className=" relative aspect-video rounded-md overflow-hidden w-full">
          <Image
            src={item.imageUrl!}
            alt={item.title}
            fill
            className=" object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium line-clamp-2 group-hover:text-sky-700 transition">
            {item.title}
          </div>
          <p className="text-xs text-muted-foreground">{item.category!.name}</p>

          <div className="my-3 flex item-center gap-x-2 text-xs md:text-sm">
            <div className="flex justify-center items-center gap-x-1">
              <div className="mr-2 h-8 w-8 rounded-full bg-sky-200 flex justify-center items-center ">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className=" text-slate-500 font-semibold">
                {item.chapter.length}
                {item.chapter.length === 1 ? " Chapter" : " Chapters"}
              </span>
            </div>
          </div>
          {item.progress !== null ? (
            <CourseProgress value={item.progress} variant="success" size="sm" />
          ) : (
            <p className="text-md font-medium text-slate-700">
              {formatPrice(item.price!)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
