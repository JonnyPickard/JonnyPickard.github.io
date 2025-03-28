import {
  AvatarFallback,
  AvatarImage,
  Avatar as SAvatar,
} from "@/components/shadcn/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-[80px] h-[80px]",
  md: "w-[150px] h-[150px]",
  lg: "w-[300px] h-[300px]",
};

export function Avatar({ src, alt, fallback, size = "sm" }: AvatarProps) {
  return (
    <SAvatar className={cn(sizeClasses[size])}>
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </SAvatar>
  );
}
