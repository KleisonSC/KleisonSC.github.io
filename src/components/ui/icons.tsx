/** Inline SVG icons (currentColor) — social links + small UI glyphs. */

type IconProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
});

export function MailIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function LinkedInIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
    </svg>
  );
}

export function GitHubIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function KaggleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="currentColor">
      <path d="M18.3 21.2a.3.3 0 0 1-.23.1h-2.5a.43.43 0 0 1-.34-.17l-4.1-5.2-1.15 1.1v3.94c0 .22-.1.33-.33.33H7.63c-.22 0-.33-.11-.33-.33V2.83c0-.22.11-.33.33-.33h2.02c.22 0 .33.11.33.33v10.9l5-5.06a.47.47 0 0 1 .35-.17h2.6c.13 0 .22.06.25.17a.28.28 0 0 1-.06.32l-5.28 5.1 5.56 6.9a.3.3 0 0 1-.1.4z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function DownloadIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
    </svg>
  );
}
