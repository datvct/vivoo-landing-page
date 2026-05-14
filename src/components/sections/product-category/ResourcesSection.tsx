import Link from "next/link";
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
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-black sm:text-[28px]">
            Resources
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-black/60 sm:text-sm sm:leading-6">
            View additional resources to
            support your Avigilon dome
            security camera deployment
            such as our Camera
            Configuration Tool,
            accessories and discontinued
            products.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {resources.map((r) => (
            <article
              key={r.title}
              className="rounded bg-white p-4 shadow-md sm:p-6"
            >
              <div className="flex items-center justify-center">
                <div className="rounded-full bg-white p-2.5 shadow-sm sm:p-3">
                  {r.icon}
                </div>
              </div>
              <h4 className="mt-4 text-center text-sm font-semibold text-black sm:mt-6">
                {r.title}
              </h4>
              <p className="mt-2 text-center text-xs leading-5 text-black/70 sm:mt-3 sm:leading-6">
                {r.description}
              </p>
              <div className="mt-4 text-center sm:mt-6">
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
