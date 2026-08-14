import type { ReactNode } from "react";

type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "danger";

type TextSize =
  | "body"
  | "label"
  | "heading";

type TextProps = {
  children: ReactNode;
  color?: TextColor;
  size?: TextSize;
};

function Text({
  children,
  color = "primary",
  size = "body",
}: TextProps) {
  const colors: Record<TextColor, string> = {
    primary: "text-green-400",
    secondary: "text-green-600",
    muted: "text-gray-400",
    danger: "text-red-500",
  };

  const sizes: Record<TextSize, string> = {
    body: "text-base font-normal",
    label: "text-sm font-medium",
    heading: "text-xl font-semibold",
  };

  return (
    <span className={`${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

export default Text;