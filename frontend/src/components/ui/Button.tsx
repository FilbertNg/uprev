import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "icon" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-[var(--color-smoke)] text-[var(--color-carbon)] hover:bg-white",
            secondary: "bg-[var(--color-tiger-flame)] text-[var(--color-smoke)] hover:bg-[var(--color-tiger-flame)]/90",
            icon: "bg-[var(--color-carbon)] border border-[var(--color-tiger-flame)] text-[var(--color-tiger-flame)] flex items-center justify-center hover:bg-[var(--color-surface)]",
            ghost: "bg-transparent text-[var(--color-tiger-flame)] hover:text-white",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        const iconSizes = {
            sm: "h-10 w-10",
            md: "h-12 w-12",
            lg: "h-14 w-14",
        };

        const appliedSize = variant === "icon" ? iconSizes[size] : sizes[size];

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex font-semibold rounded-full items-center justify-center transition-colors duration-300",
                    appliedSize,
                    variants[variant],
                    className
                )}
                data-magnetic
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
