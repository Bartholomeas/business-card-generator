"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { type PopoverProps } from "@radix-ui/react-popover";
import { type Preset } from "./presets";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/popover";
import { Button } from "~/components/common/button";

import { ChevronFirst } from "lucide-react";

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[];
}

export function PresetSelector({ presets, ...props }: PresetSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Wybierz konfigurację..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedPreset ? selectedPreset.name : "Wybierz konfigurację..."}
          <ChevronFirst className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <p>in progress..</p>
        {/*<Command>*/}
        {/*  <CommandInput placeholder="Search presets..." />*/}
        {/*  <CommandEmpty>No presets found.</CommandEmpty>*/}
        {/*  <CommandGroup heading="Examples">*/}
        {/*    {presets.map(preset => (*/}
        {/*      <CommandItem*/}
        {/*        key={preset.id}*/}
        {/*        onSelect={() => {*/}
        {/*          setSelectedPreset(preset);*/}
        {/*          setOpen(false);*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {preset.name}*/}
        {/*        <Check*/}
        {/*          className={cn(*/}
        {/*            "ml-auto h-4 w-4",*/}
        {/*            selectedPreset?.id === preset.id ? "opacity-100" : "opacity-0",*/}
        {/*          )}*/}
        {/*        />*/}
        {/*      </CommandItem>*/}
        {/*    ))}*/}
        {/*  </CommandGroup>*/}
        {/*  <CommandGroup className="pt-0">*/}
        {/*    <CommandItem onSelect={() => router.push("/examples")}>More examples</CommandItem>*/}
        {/*  </CommandGroup>*/}
        {/*</Command>*/}
      </PopoverContent>
    </Popover>
  );
}