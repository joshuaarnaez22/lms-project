"use client";

import { useConfettiStore } from "@/store/confetti";
import React from "react";
import Confetti from "react-confetti";
const ConfettiProvider = () => {
  const { onClose, isOpen } = useConfettiStore();

  if (!isOpen) return null;

  return (
    <Confetti
      className=" pointer-events-none z-[101]"
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => onClose()}
    />
  );
};

export default ConfettiProvider;
