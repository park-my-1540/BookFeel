// components/ui/LoadingButton.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

type LoadingButtonProps = {
  variant:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  isLoading: boolean;
  loadingText?: ReactNode;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function LoadingButton({
  isLoading,
  variant,
  loadingText = "로딩 중...",
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center gap-2'>
          <Loader2 className='w-4 h-4 animate-spin' />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
