import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Customized badge variations
const badgeVariants = cva(
  `px-2 py-1 rounded-full text-white`,
  {
    variants: {
      color: {
        primary: "bg-blue-500",
        danger: "bg-red-500",
        success: "bg-green-500",
      },
      size: {
        xsmall: 'text-sm',
        small: 'text-sm',
        normal: 'text-base',
        medium: 'text-lg',
        large: 'text-xl',
        xlarge: 'text-2xl',
      }
    },
    defaultVariants: {
      color: "primary",
      size: "normal",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children, color, size }) => {
  return (
    <span className={cn(badgeVariants({ color,size }))}>
      {children}
    </span>
  );
};

export { Badge, badgeVariants }