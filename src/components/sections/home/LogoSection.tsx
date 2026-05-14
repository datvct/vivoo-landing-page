
import Image from "next/image";

export default function LogoSection() {
  return (
    <section className="bg-[#FCFCFC] py-12 flex flex-col gap-5">
      <h2 className="text-center text-2xl font-semibold text-black">
        Trusted by 100,000+ organizations globally
      </h2>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-20 text-black">
        <div>Logo 1</div>
        <div>Logo 2</div>
        <div>Logo 3</div>
        <div>Logo 4</div>
        <div>Logo 5</div>
      </div>
    </section>
  );
}