"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type Line = { type: "input" | "output" | "ascii"; text: string };

const BANNER = `  _  _____   __
 | |/ / __| /  \\   kleison@portfolio:~$
 | ' <\\__ \\| () |  type 'help' to begin
 |_|\\_\\___/ \\__/`;

export function Terminal() {
  const t = useTranslations("about.terminal");
  const [history, setHistory] = useState<Line[]>([
    { type: "ascii", text: BANNER },
    { type: "output", text: t("welcome") },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ type: "input", text: raw }];

    switch (cmd) {
      case "":
        break;
      case "help":
        out.push({
          type: "output",
          text: "available commands:\n  whoami    projects   skills\n  phd       contact    clear\n  help",
        });
        break;
      case "whoami":
        out.push({ type: "output", text: t("whoami") });
        break;
      case "projects":
        out.push({
          type: "output",
          text: "→ Pavement Monitoring of Highway Structures (Eiffage)\n→ Fatigue of Cementitious Materials (UFC)\n→ Ultrasonic Wave Characterization (UFC)\n→ Rheology of Alkali-Activated Materials (UFC)\n→ Thermomechanical Analysis of Massive Foundations (UFC)",
        });
        break;
      case "skills":
        out.push({
          type: "output",
          text: "python · matlab · latex\nansys · comsol · abaqus\nautocad · revit · civil3d · solidworks\nUTM-25 · labview · rheology · climatic chamber",
        });
        break;
      case "phd":
        out.push({ type: "output", text: t("phd") });
        break;
      case "contact":
        out.push({
          type: "output",
          text: `email    ${site.email}\nlinkedin ${site.socials.linkedin}\ngithub   ${site.socials.github}\nkaggle   ${site.socials.kaggle}`,
        });
        break;
      case "clear":
        setHistory([]);
        setValue("");
        return;
      case "sudo":
      case "sudo su":
        out.push({ type: "output", text: t("sudo") });
        break;
      default:
        out.push({ type: "output", text: `${cmd}: ${t("notFound")}` });
    }

    setHistory((h) => [...h, ...out]);
    setValue("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-2 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
        <p className="mb-5 font-mono text-[0.7rem] text-text-muted">{t("hint")}</p>
      </Reveal>

      <Reveal index={1}>
        <div
          className="overflow-hidden rounded-lg border border-purple-neon/25 bg-black/60 font-mono text-xs shadow-[0_0_30px_-10px_var(--purple-glow)]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-purple-neon/20 bg-bg-elevated/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-acid" />
            <span className="ml-2 text-[0.65rem] text-text-muted">
              kleison@portfolio — zsh
            </span>
          </div>

          {/* body */}
          <div className="max-h-80 overflow-y-auto p-4 leading-relaxed">
            {history.map((line, i) => {
              if (line.type === "ascii")
                return (
                  <pre key={i} className="mb-2 whitespace-pre text-purple-neon">
                    {line.text}
                  </pre>
                );
              if (line.type === "input")
                return (
                  <div key={i} className="text-text-primary">
                    <span className="text-green-acid">kleison@portfolio</span>
                    <span className="text-text-muted">:~$ </span>
                    {line.text}
                  </div>
                );
              return (
                <pre key={i} className="mb-2 whitespace-pre-wrap text-text-muted">
                  {line.text}
                </pre>
              );
            })}

            {/* prompt */}
            <div className="flex items-center text-text-primary">
              <span className="text-green-acid">kleison@portfolio</span>
              <span className="text-text-muted">:~$&nbsp;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run(value)}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
                className="flex-1 bg-transparent caret-green-acid outline-none"
              />
            </div>
            <div ref={endRef} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
