"use client";
import { Category } from "@prisma/client";
import React from "react";

import CategoryItem from "../../../../components/shared/category-item";
import {
  FcCamera,
  FcMusic,
  FcSportsMode,
  FcSalesPerformance,
  FcMultipleDevices,
  FcFilmReel,
  FcEngineering,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  Music: FcMusic,
  Fitness: FcSportsMode,
  Photography: FcCamera,
  Accounting: FcSalesPerformance,
  Engineering: FcEngineering,
  Filming: FcFilmReel,
};
const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center overflow-x-auto gap-x-2 pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
