export function PageShell({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-8 lg:py-12">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </section>
      {children}
    </main>
  );
}
