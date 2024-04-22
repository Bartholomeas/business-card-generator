import { cva, type VariantProps } from "class-variance-authority";

const backlightVariants = cva(
  "",
  // "animate-moveInCircle absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)]
  // w-[var(--size)] opacity-100
  // [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]
  // [mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-800px)_calc(50%+800px)] bg-rose-500",
  {
    variants: {
      size: {
        default: "size-24",
        sm: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface BacklightProps extends VariantProps<typeof backlightVariants> {
  className?: string;
}

export const Backlight = ({ size = "default", className }: BacklightProps) => {
  return (
    <span
      className={backlightVariants({
        size,
        className,
      })}
    />
  );
};