import Image from "next/image";

type AdminAvatarCellProps = {
  name: string;
  email: string;
  avatar?: string;
};

export default function AdminAvatarCell({
  name,
  email,
  avatar,
}: AdminAvatarCellProps) {
  const initial = name
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-900">
          {name}
        </div>
        <div className="truncate text-xs text-slate-500">
          {email}
        </div>
      </div>
    </div>
  );
}
