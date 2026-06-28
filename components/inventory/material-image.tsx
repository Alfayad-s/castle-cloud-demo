"use client";

import { getMaterialImageAlt, getMaterialImageStyle } from "@/lib/material-images";
import type { Material } from "@/types";
import { cn } from "@/lib/utils";

type MaterialImageProps = {
  material: Pick<Material, "name" | "category">;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-9 text-base",
  md: "size-11 text-lg",
  lg: "size-16 text-2xl",
};

export function MaterialImage({ material, className, size = "sm" }: MaterialImageProps) {
  const style = getMaterialImageStyle(material.category);

  return (
    <div
      role="img"
      aria-label={getMaterialImageAlt(material)}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg ring-1 ring-border",
        sizeClasses[size],
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${style.from} 0%, ${style.to} 100%)`,
      }}
    >
      <span aria-hidden className="drop-shadow-sm">
        {style.emoji}
      </span>
    </div>
  );
}
