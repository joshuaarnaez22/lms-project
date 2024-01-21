"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}
const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;

  const clickCategory = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };
  return (
    <button
      onClick={clickCategory}
      type="button"
      className={twMerge(
        "py-2 px-3 rounded-full border border-slate-200 flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
    >
      {Icon && <Icon size={20} />}
      <div className=" truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
