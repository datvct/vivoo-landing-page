export default function ContactSection() {
  return (
    <section className="bg-[#f2f2f2] py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            Have questions? We can help
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/65 sm:mt-5 sm:text-[15px] sm:leading-7">
            Our video security experts
            can help you implement the
            right security system for
            your business.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl bg-white px-4 py-6 shadow-[0_15px_35px_rgba(15,23,42,0.08)] sm:mt-14 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <form className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <input
                type="text"
                placeholder="First name*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
              <input
                type="text"
                placeholder="Last name*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <input
                type="email"
                placeholder="Work email*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
              <input
                type="text"
                placeholder="Phone number*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <input
                type="text"
                placeholder="Company name*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
              <input
                type="text"
                placeholder="Postal code*"
                className="h-10 border border-black/25 px-3 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:h-12 sm:px-4 sm:text-[15px]"
              />
            </div>

            <textarea
              placeholder="Optional: Tell us about your security needs or projects"
              className="min-h-24 w-full border border-black/25 px-3 py-2 text-sm text-black outline-none placeholder:text-black/45 focus:border-black/50 sm:min-h-28 sm:px-4 sm:py-3 sm:text-[15px]"
            />

            <div className="pt-4 text-center sm:pt-5">
              <button
                type="submit"
                className="inline-flex h-10 min-w-28 items-center justify-center rounded-full bg-black px-6 text-xs font-semibold tracking-wide text-white transition hover:bg-black/85 sm:h-12 sm:min-w-32 sm:px-8 sm:text-sm"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
