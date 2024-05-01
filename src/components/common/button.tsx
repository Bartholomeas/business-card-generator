import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";
import { type LucideIcon, type LucideProps, RefreshCcw } from "lucide-react";

// eslint-disable-next-line tailwindcss/no-contradicting-classname
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md border text-sm font-semibold text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-foreground-dark hover:bg-primary-300",
        destructive: "bg-destructive text-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-primary bg-background text-foreground hover:bg-primary-600 hover:text-foreground-dark",
        secondary: "bg-secondary text-foreground shadow-sm hover:bg-secondary/80",
        ghost: "border-none hover:bg-white/10 hover:text-foreground",
        link: "border-none bg-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
  iconProps?: LucideProps & { iconClassName?: string };
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