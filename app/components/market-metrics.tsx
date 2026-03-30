import { type MarketMetric } from "../lib/artmatch-data";

type MarketMetricsProps = {
  metrics: MarketMetric[];
};

export function MarketMetrics({ metrics }: MarketMetricsProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/55">
            Investor Snapshot
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-black">
            Fair-value pricing.
          </h3>
        </div>
        <p className="text-sm text-black/60">Built for a 4–6 week MVP launch</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-black/10 bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-black/50">{metric.label}</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-black">{metric.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
