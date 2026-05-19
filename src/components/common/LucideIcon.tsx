import * as LucideIcons from "lucide-react";

type LucideIconProps = {
  name: string;
  className?: string;
  size?: number;
};

export default function LucideIcon({ name, className, size }: LucideIconProps) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <LucideIcons.HelpCircle className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
