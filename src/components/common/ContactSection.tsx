export default function ContactSection() {
    return (
        <section className="bg-[#f2f2f2] py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-[42px] font-medium tracking-[-0.02em] text-black sm:text-[46px]">
                        Have questions? We can help
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/65 sm:text-base">
                        Our video security experts can help you implement the right security system for your business.
                    </p>
                </div>

                <div className="mx-auto mt-14 max-w-3xl bg-white px-8 py-8 shadow-[0_15px_35px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="First name*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                            <input
                                type="text"
                                placeholder="Last name*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="email"
                                placeholder="Work email*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                            <input
                                type="text"
                                placeholder="Phone number*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Company name*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                            <input
                                type="text"
                                placeholder="Postal code*"
                                className="h-12 border border-black/25 px-4 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                            />
                        </div>

                        <textarea
                            placeholder="Optional: Tell us about your security needs or projects"
                            className="min-h-28 w-full border border-black/25 px-4 py-3 text-[15px] text-black outline-none placeholder:text-black/45 focus:border-black/50"
                        />

                        <div className="pt-5 text-center">
                            <button
                                type="submit"
                                className="inline-flex h-12 min-w-32 items-center justify-center rounded-full bg-black px-8 text-sm font-semibold tracking-wide text-white transition hover:bg-black/85"
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