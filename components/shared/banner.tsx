import { AlertTriangle, CheckCheckIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type VariantProps = {
  type: "success" | "warning";
  label: string;
};

const iconMap = {
  warningIcon: AlertTriangle,
  successIcon: CheckCheckIcon,
};
const Banner = ({ type, label }: VariantProps) => {
  const Icon = type === "warning" ? iconMap.warningIcon : iconMap.successIcon;
  return (
    <div
      className={twMerge(
        "border w-full text-center p-4 text-sm flex items-center",
        type === "warning" && "bg-yellow-200/80 border-yellow-30 text-primary",
        type === "success" && "bg-emerald-700 border-emerald-800 text-secondary"
      )}
    >
      <Icon className="h4-4 w-4 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
