import {
  AvatarFallback,
  AvatarImage,
  Avatar as SAvatar,
} from "@/components/shadcn/avatar";
import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-[80px] h-[80px]",
  md: "w-[150px] h-[150px]",
  lg: "w-[300px] h-[300px]",
};

export function Avatar({ src, alt, size = "sm", className }: AvatarProps) {
  return (
    <SAvatar className={cn(sizeClasses[size], className)}>
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarFallback>
          <Skeleton className={cn(sizeClasses[size], "rounded-full")} />
        </AvatarFallback>
      )}
    </SAvatar>
  );
}
