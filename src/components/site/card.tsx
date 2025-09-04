import { cn } from "@/lib/utils";
import * as React from "react";

export function CardShell({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn("bg-white p-6 rounded-3xl ring-1 ring-ink/10", className)}
    >
      {children}
    </div>
  );
}
