import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";

type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, variant = "primary", type = "button", className = "", ...props }: ButtonProps) {
    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-green-600 text-white hover:bg-green-500",

        secondary:
            "bg-gray-800 text-green-400 hover:bg-gray-700",

        danger:
            "bg-red-600 text-white hover:bg-red-500",

        ghost:
            "text-green-400 hover:bg-green-900",
    }

    return (
        <button type={type}
            className={`rounded-lg
        px-4 py-2
        font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button