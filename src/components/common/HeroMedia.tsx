import Image from "next/image";

type SolutionHeroMediaProps = {
  image: string;
  title: string;
};

export default function SolutionHeroMedia({
  image,
  title,
}: SolutionHeroMediaProps) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        clipPath:
          "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(110deg,rgba(246,246,246,1)_0%,rgba(246,246,246,0.8)_5%,transparent_15%)]" />

      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
