"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComboboxProps } from "@/lib/type";
import { useFormContext } from "react-hook-form";

export function Combobox({ options, value, onChange, name }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const { register, formState } = useFormContext();
  const { errors } = formState || {};

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              errors[name] && "border-red-500"
            )}
            {...register(name)}
            name={name}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-full p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(
                      option.value === value ? "" : option.value,
                      option.id
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-red-500 text-xs italic transition-opacity ease-in duration-700 opacity-100 mt-2">
        {errors[name]?.message?.toString()}
      </p>
    </div>
  );
}
