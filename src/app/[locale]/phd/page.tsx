import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResearchAxes } from "@/components/phd/ResearchAxes";
import { PhdTimeline } from "@/components/phd/PhdTimeline";
import { Publications } from "@/components/phd/Publications";
import { UpdatesLog } from "@/components/phd/UpdatesLog";
import { SectionDivider } from "@/components/ui/SectionDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "phd" });
  return { title: `${t("metaTitle")} — Kleison Silva` };
}

export default async function PhdPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "phd" });

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      {/* Status + research description */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-acid/40 bg-green-acid/5 px-3 py-1 font-mono text-xs text-green-acid">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-acid opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-acid" />
          </span>
          {t("status")}
        </span>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-primary">
          {t("description")}
        </p>
      </section>

      <SectionDivider />
      <ResearchAxes />
      <PhdTimeline />
      <SectionDivider flip />
      <Publications />
      <UpdatesLog />
    </>
  );
}
