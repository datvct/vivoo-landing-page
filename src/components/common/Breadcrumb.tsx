import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  currentLabel?: string;
  className?: string;
};

export default function Breadcrumb({
  items,
  currentLabel,
  className = "",
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
    >
      <ol className="flex flex-wrap items-center gap-2 text-xs">
        {items.map((item, idx) => {
          const isLastItem = idx === items.length - 1;
          const textClass = !currentLabel && isLastItem ? "text-black" : "text-black/45";
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-black/60 ${textClass}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`${textClass}`}>{item.label}</span>
              )}

              {(!isLastItem || !!currentLabel) && (
                <span aria-hidden="true" className="text-black/30">›</span>
              )}
            </li>
          );
        })}

        {currentLabel ? (
          <li className="text-black" aria-current="page">
            {currentLabel}
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
