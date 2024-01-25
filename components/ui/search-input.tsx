"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import UseDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useTitleStore } from "@/store/titleparams";

const SearchInput = () => {
  const { title, setTitle } = useTitleStore();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedValue = UseDebounce(title);

  const currentCategoryId = searchParams.get("categoryId");
  useEffect(() => {
    const urlParams = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(urlParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategoryId, debouncedValue, pathname, router]);

  useEffect(() => {
    return () => {
      setTitle("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative">
      <Search className=" absolute h-4 w-4 top-3 left-3 text-slate-300" />
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search for a course"
        className=" w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-300"
      />
    </div>
  );
};

export default SearchInput;
