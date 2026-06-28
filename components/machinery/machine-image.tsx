"use client";

import Image from "next/image";

import { getMachineImageAlt, getMachineImageSrc } from "@/lib/machinery-images";
import type { Machine } from "@/types";
import { cn } from "@/lib/utils";

type MachineImageProps = {
  machine: Pick<Machine, "name" | "image" | "type">;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function MachineImage({
  machine,
  className,
  fill,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
}: MachineImageProps) {
  const src = getMachineImageSrc(machine.image);

  if (fill) {
    return (
      <Image
        src={src}
        alt={getMachineImageAlt(machine)}
        fill
        className={cn("object-cover", className)}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={getMachineImageAlt(machine)}
      width={width ?? 88}
      height={height ?? 88}
      className={cn("object-cover", className)}
      sizes={sizes}
      priority={priority}
    />
  );
}
