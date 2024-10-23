import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon, type LucideProps, RefreshCcw } from "lucide-react";

import { cn } from "~/utils";

const buttonVariants = cva(
  `
    touch-action-manipulation inline-flex cursor-pointer
    select-none items-center justify-center
    whitespace-nowrap rounded-sm border-2
    border-foreground text-sm font-semibold
    transition-all duration-300 will-change-transform
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-foreground text-white
          hover:translate-y-[-2px] hover:shadow-[0_8px_15px_rgba(0,0,0,0.25)]
          active:translate-y-0 active:shadow-none
        `,
        destructive: "bg-destructive text-foreground shadow-sm hover:bg-destructive/90",
        outline: `
          border-foreground bg-background text-foreground
          hover:bg-foreground hover:text-background
        `,
        secondary: "hover:bg-foreground/90 bg-foreground text-background shadow-sm",
        ghost: "border-none hover:bg-white/10 hover:text-foreground",
        link: "border-none bg-transparent px-0 text-foreground underline-offset-4 hover:underline",
        flat: `
          hover:bg-foreground/90 bg-foreground
          text-white
        `,
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        md: "h-10 rounded-sm px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon;
  iconProps?: LucideProps & { iconClassName?: string; };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      icon: Icon,
      iconProps: { iconClassName, ...iconProps } = { iconClassName: undefined },
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    // const Icon = icon ? icons[icon as keyof typeof icons] : null;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading ?? props.disabled}
        {...props}
      >
        {isLoading ? (
          <RefreshCcw size={12} className="mr-2 animate-spin" />
        ) : Icon ? (
          <Icon size={12} {...iconProps} className={cn("mr-2", iconClassName)} />
        ) : null}

        {props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
