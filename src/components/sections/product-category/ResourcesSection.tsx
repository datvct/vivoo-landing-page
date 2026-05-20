import Link from "next/link";
import H5aIrPtzIcon from "@/components/icons/H5aIrPtzIcon";
import ToolsRepairIcon from "@/components/icons/ToolsRepairIcon";
import AlertFolderIcon from "@/components/icons/AlertFolderIcon";
import { GeneralResource } from "@/types/types";

interface ResourcesSectionProps {
  items?: GeneralResource[];
}

export default function ResourcesSection({ items }: ResourcesSectionProps) {
  const icons = [
    <H5aIrPtzIcon className="h-8 w-8 text-black" key="camera" />,
    <ToolsRepairIcon className="h-8 w-8 text-black" key="repair" />,
    <AlertFolderIcon className="h-8 w-8 text-black" key="folder" />,
  ];

  const defaultResources = [
    {
      title: "Camera Configuration Tool",
      description:
        "Configure your cameras, apply common settings to multiple cameras or adjust individual cameras to fit your site requirements.",
      url: "#",
    },
    {
      title: "Camera Accessories",
      description:
        "View technical documents such as installation guides and datasheets for camera accessories.",
      url: "#",
    },
    {
      title: "Discontinued Products",
      description:
        "View technical documents and firmware for cameras and sensors that have been discontinued.",
      url: "#",
    },
  ];

  const displayItems = items && items.length >= 3 ? items : defaultResources;

  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-black sm:text-3xl">
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
          {displayItems.slice(0, 3).map((r, index) => (
            <article
              key={r.title || index}
              className="rounded bg-white p-4 shadow-md sm:p-6"
            >
              <div className="flex items-center justify-center">
                <div className="rounded-full bg-white p-2.5 shadow-sm sm:p-3">
                  {icons[index] || icons[0]}
                </div>
              </div>
              <h4 className="mt-4 text-center text-sm font-semibold text-black sm:mt-6 sm:text-lg">
                {r.title}
              </h4>
              <p className="mt-2 text-center text-xs leading-5 text-black/70 sm:mt-3 sm:text-base sm:leading-6">
                {r.description}
              </p>
              <div className="mt-4 text-center sm:mt-6">
                <Link
                  href={r.url || "#"}
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
