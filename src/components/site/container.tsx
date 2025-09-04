import { cn } from "@/lib/utils";


export default function Container({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("max-w-6xl mx-auto container-px ", className)}>
      {children}
    </div>
  );
}
