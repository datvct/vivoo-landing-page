import { notFound } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { LOCALES, type Locale } from "@/i18n/config";
import { getLocaleFromParams } from "@/i18n/navigation";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams({ locale: localeParam });

  if (localeParam !== locale) {
    notFound();
  }

  return (
    <LocaleProvider initialLocale={locale as Locale}>
      <Header />
      {children}
      <Footer />
    </LocaleProvider>
  );
}
