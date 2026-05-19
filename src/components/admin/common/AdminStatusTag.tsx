import { Tag } from "antd";

export type AdminStatusTone =
  | "success"
  | "warning"
  | "default"
  | "processing";

type AdminStatusTagProps = {
  label: string;
  tone?: AdminStatusTone;
};

export default function AdminStatusTag({
  label,
  tone = "success",
}: AdminStatusTagProps) {
  const colorMap: Record<
    AdminStatusTone,
    string
  > = {
    success: "green",
    warning: "gold",
    default: "default",
    processing: "cyan",
  };

  return (
    <Tag color={colorMap[tone]}>
      {label}
    </Tag>
  );
}
