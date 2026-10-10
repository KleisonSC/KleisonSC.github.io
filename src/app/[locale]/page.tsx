import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { HighlightCards } from "@/components/home/HighlightCards";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SectionDivider />
      <HighlightCards />
    </>
  );
}
