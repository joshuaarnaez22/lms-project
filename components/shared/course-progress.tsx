import React from "react";
import { Progress } from "@/components/ui/progress";
import { twMerge } from "tailwind-merge";

interface CourseProgressProps {
  value: number;
  variant: "default" | "success";
  size: "default" | "sm";
}

const CourseProgress = ({
  value,
  variant = "default",
  size = "default",
}: CourseProgressProps) => {
  const bgVariant = {
    default: "bg-gray-200",
    success: "bg-emerald-700",
  };

  const fillVariant = {
    default: "bg-sky-900",
    success: "bg-emerald-700",
  };
  const sizeVariant = {
    default: "text-sm",
    sm: "text-xs",
  };

  const pVariant = {
    default: "text-sky-900",
    success: "text-emerald-700",
  };

  return (
    <div>
      <Progress
        value={value}
        className={twMerge("h-2", variant && bgVariant[variant])}
        fill={`${
          value === 100 ? fillVariant["success"] : fillVariant["default"]
        }`}
      />
      <p
        className={twMerge(
          "font-medium mt-2",
          sizeVariant[size],
          pVariant[variant]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
