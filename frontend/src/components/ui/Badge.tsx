import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border border-[var(--color-tiger-flame)]/30 bg-transparent px-3 py-1",
                "text-[12px] font-bold text-[var(--color-tiger-flame)]",
                className
            )}
        >
            {children}
        </div>
    );
}
