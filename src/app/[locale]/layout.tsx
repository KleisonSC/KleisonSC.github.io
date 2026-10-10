import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HtmlLangSync } from "@/components/system/HtmlLangSync";
import { NoiseOverlay } from "@/components/system/NoiseOverlay";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { CursorFX } from "@/components/system/CursorFX";
import { Loader } from "@/components/system/Loader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Pre-render one static branch per locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt this segment into static rendering for the resolved locale.
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <HtmlLangSync locale={locale} />
      <NoiseOverlay />
      <CursorFX />
      <Loader />
      <SmoothScroll>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </div>
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
