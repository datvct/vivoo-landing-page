import Image from "next/image";
import Link from "next/link";

const solutions = [
  {
    id: "video",
    title: "Video Security",
    subtitle:
      "Better visibility, smarter detection",
    description:
      "Integrated camera systems with AI analytics to detect, identify and alert in real time.",
    image: "/images/image1.avif",
    href: "/solutions/video-security",
  },
  {
    id: "cameras",
    title: "Security Cameras",
    subtitle: "High-resolution imaging",
    description:
      "A range of high-performance cameras for identification, low-light performance and durability.",
    image: "/images/image1.avif",
    href: "/solutions/cameras",
  },
  {
    id: "access",
    title: "Access Control",
    subtitle:
      "Secure, centralized access",
    description:
      "Scalable access management with mobile credentials, policies and centralized monitoring.",
    image: "/images/camera-1.avif",
    href: "/solutions/access-control",
  },
  {
    id: "sensors",
    title: "Smart Sensors",
    subtitle:
      "Intelligent perimeter sensing",
    description:
      "Sensor networks for environmental and perimeter monitoring that reduce false alarms.",
    image: "/images/camera-2.avif",
    href: "/solutions/sensors",
  },
];

export default function SolutionsListPage() {
  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Solutions
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Explore our solutions. Each
            card highlights the core
            capability and includes a
            direct link to learn more.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, idx) => (
            <article
              key={s.id}
              className="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-3 rounded-md bg-white/60 px-3 py-2 text-sm font-medium text-gray-800 backdrop-blur">
                  {s.subtitle}
                </div>
                <div className="pointer-events-none absolute right-4 bottom-4 select-none">
                  <span className="text-5xl font-extrabold text-white/18 sm:text-6xl">
                    {(idx + 1)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="px-8 py-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  {s.description}
                </p>

                <div className="mt-6">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 rounded-md bg-[#0b76ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6]"
                  >
                    Learn more
                    <span aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
