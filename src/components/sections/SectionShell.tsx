import type { SectionId } from "@/data/portfolio";
import { ui } from "@/lib/ui";

type Props = {
  id: SectionId;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({ id, title, subtitle, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-28 py-10 md:py-14 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-6">
          <p className={ui.label}>{id.replace("-", " ")}</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className={`mt-2 max-w-2xl ${ui.muted}`}>{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
