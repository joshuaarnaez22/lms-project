"use client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CourseSidebarItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}
const CourseSidebarItem = ({
  id,
  title,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  return (
    <div>
      <Link href={`/courses/${courseId}/chapters/${id}`}>
        <button
          type="button"
          className={twMerge(
            "flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full h-full",
            isActive && "text-slate-700 bg-slate-200/20",
            isCompleted && "text-emerald-700 hover:text-emerald-700",
            isActive && isCompleted && "bg-emerald-200/20"
          )}
        >
          <div className="flex items-center py-4 gap-x-4 ">
            <Icon
              size={22}
              className={twMerge(
                "text-slate-500",
                isActive && "text-slate-700",
                isCompleted && "text-emerald-700"
              )}
            />
            {title}
          </div>
          <div
            className={twMerge(
              "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all ",
              isActive && " opacity-100",
              isCompleted && "opacity-100 border-emerald-700"
            )}
          />
        </button>
      </Link>
    </div>
  );
};

export default CourseSidebarItem;
