import ContactForm from "@/components/common/ContactForm";
import LogoSection from "@/components/common/LogoSection";

export default function ContactPage() {
  return (
    <div className="bg-white py-8 text-black lg:py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h1 className="text-[34px] font-semibold">
          Get your free quote
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60">
          Provide us some quick
          information about your
          security needs and our team of
          experts will get your no
          obligation pricing right away.
        </p>
      </div>

      <div className="mt-10 flex justify-center px-6">
        <ContactForm />
      </div>

      <div className="mt-6 sm:mt-16">
        <LogoSection />
      </div>
    </div>
  );
}
