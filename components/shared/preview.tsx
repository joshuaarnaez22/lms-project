"use client";
import { EditorProps } from "@/lib/type";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

const Preview = ({ value }: EditorProps) => {
  const QuillNoSSRWrapper = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <QuillNoSSRWrapper theme="bubble" value={value} readOnly={true} />;
};

export default Preview;
