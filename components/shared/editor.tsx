"use client";
import { EditorProps } from "@/lib/type";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }: any) => {
  const QuillNoSSRWrapper = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <p className="bg-slate-100">Loading text editor...</p>,
      }),
    []
  );
  return (
    <div className="bg-white ">
      <QuillNoSSRWrapper theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
