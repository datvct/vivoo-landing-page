import Link from "next/link";
import {
  Archive,
  //   Tool,
  Settings,
} from "lucide-react";
import H5aIrPtzIcon from "@/components/icons/H5aIrPtzIcon";
import ToolsRepairIcon from "@/components/icons/ToolsRepairIcon";
import AlertFolderIcon from "@/components/icons/AlertFolderIcon";

type Resource = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const resources: Resource[] = [
  {
    title: "Camera Configuration Tool",
    description:
      "Configure your cameras, apply common settings to multiple cameras or adjust individual cameras to fit your site requirements.",
    href: "#",
    icon: (
      <H5aIrPtzIcon className="h-8 w-8 text-black" />
    ),
  },
  {
    title: "Camera Accessories",
    description:
      "View technical documents such as installation guides and datasheets for camera accessories.",
    href: "#",
    icon: (
      <ToolsRepairIcon className="h-8 w-8 text-black" />
    ),
  },
  {
    title: "Discontinued Products",
    description:
      "View technical documents and firmware for cameras and sensors that have been discontinued.",
    href: "#",
    icon: (
      <AlertFolderIcon className="h-8 w-8 text-black" />
    ),
  },
];

export default function ResourcesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-lg font-medium text-black sm:text-[22px]">
            Resources
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60">
            View additional resources to
            support your Avigilon dome
            security camera deployment
            such as our Camera
            Configuration Tool,
            accessories and discontinued
            products.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <article
              key={r.title}
              className="rounded bg-white p-6 shadow-md"
            >
              <div className="flex items-center justify-center">
                <div className="rounded-full bg-white p-3 shadow-sm">
                  {r.icon}
                </div>
              </div>
              <h4 className="mt-6 text-center text-sm font-semibold text-black">
                {r.title}
              </h4>
              <p className="mt-3 text-center text-xs text-black/70">
                {r.description}
              </p>
              <div className="mt-6 text-center">
                <Link
                  href={r.href}
                  className="text-sm font-semibold text-blue-600"
                >
                  Learn More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
