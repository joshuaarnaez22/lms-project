import { LucideIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface InfoCardProps {
  numberOfCourse: number;
  icon: LucideIcon;
  label: string;
  type: "success" | "default";
}
const InfoCard = ({
  numberOfCourse,
  icon: Icon,
  label,
  type,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md items-center p-4 flex gap-x-2 ">
      <div
        className={twMerge(
          "p-2 rounded-full",
          type === "success" ? "bg-emerald-300" : "bg-sky-300"
        )}
      >
        <Icon
          className={twMerge(
            "w-6 h-6",
            type === "success" ? "text-emerald-700" : "text-sky-700"
          )}
        />
      </div>
      <div>
        <p className="text-lg font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfCourse} {numberOfCourse <= 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
