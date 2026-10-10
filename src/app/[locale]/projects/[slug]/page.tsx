import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects, getProject } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Equation } from "@/components/projects/Equation";
import { ArrowRightIcon } from "@/components/ui/icons";

// One static page per project slug (combined with each locale by the parent).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: `${t(`items.${slug}.title`)} — Kleison Silva`,
    description: t(`items.${slug}.summary`),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const title = t(`items.${slug}.title`);

  return (
    <article>
      {/* Hero with blurred visual background */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <ProjectVisual slug={slug} className="h-full w-full scale-110 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-bg-primary/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
            <Link
              href="/projects"
              className="mb-4 inline-flex items-center gap-1.5 font-mono text-xs text-green-acid transition-colors hover:text-green-glow"
            >
              <ArrowRightIcon size={14} className="rotate-180" />
              {t("back")}
            </Link>
            <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] text-text-muted">
              <span className="rounded border border-purple-neon/40 px-2 py-0.5 uppercase tracking-wider text-purple-neon">
                {t(`categories.${project.category}`)}
              </span>
              <span>{project.period}</span>
              <span>·</span>
              <span>{project.location}</span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
          <div>
            <p className="text-lg leading-relaxed text-text-primary">
              {t(`items.${slug}.summary`)}
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-text-muted">
              {t(`items.${slug}.description`)
                .split("\n")
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            {project.equations && project.equations.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-green-acid">
                  {t("keyEquations")}
                </h2>
                {project.equations.map((eq, i) => (
                  <Equation key={i} tex={eq} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar metadata */}
          <aside className="h-fit rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-5">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-green-acid">
              {t("tags")}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-purple-neon/25 px-2.5 py-1 font-mono text-[0.65rem] text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-green-acid hover:text-green-glow"
              >
                {t("externalLink")}
                <ArrowRightIcon size={14} />
              </a>
            )}
          </aside>
        </div>

        <div className="mt-12 border-t border-purple-neon/15 pt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-text-muted transition-colors hover:text-green-acid"
          >
            <ArrowRightIcon size={16} className="rotate-180" />
            {t("back")}
          </Link>
        </div>
      </div>
    </article>
  );
}
