import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Bio } from "@/components/about/Bio";
import { Skills } from "@/components/about/Skills";
import { Timeline } from "@/components/about/Timeline";
import { Terminal } from "@/components/about/Terminal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("metaTitle")} — Kleison Silva` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <Bio />
      <SectionDivider />
      <Skills />
      <Timeline />
      <SectionDivider flip />
      <Terminal />
    </>
  );
}
