import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InfoProps {
  children: React.ReactNode;
  content: string;
}

const AdditionalInfo = ({ children, content }: InfoProps) => {
  return (
    <Popover>
      {children}
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};

export default AdditionalInfo;
