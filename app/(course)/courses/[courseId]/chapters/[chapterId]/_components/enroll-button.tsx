"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/price-format";
import toast from "react-hot-toast";
import axios from "axios";

interface EnrollButtonProps {
  price: number;
  courseId: string;
}
const EnrollButton = ({ price, courseId }: EnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const enroll = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/purchase`);
      window.location.assign(response.data.result.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className=" w-full lg:w-auto"
      onClick={enroll}
      disabled={isLoading}
      size="sm"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default EnrollButton;
