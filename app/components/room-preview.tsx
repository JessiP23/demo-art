import type { Artwork, TasteProfile } from "../lib/artmatch-data";

type RoomPreviewProps = {
  artwork: Artwork;
  profile: TasteProfile;
};

export function RoomPreview({ artwork, profile }: RoomPreviewProps) {
  return (
    <section className="grid gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.35)] lg:grid-cols-[1.15fr_1fr]">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/55">
          Room mockup
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-black">See it before you buy.</h3>
        <p className="max-w-lg text-sm leading-6 text-black/70">
          Upload room or set style preferences, then validate scale and tone before offer
          submission.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70">
            {profile.roomType}
          </span>
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70">
            {profile.palette}
          </span>
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70">
            {artwork.dimensions}
          </span>
        </div>
      </div>
      <div className="rounded-2xl border border-black/10 bg-stone-100 p-4">
        <div className="mx-auto flex h-[220px] max-w-sm flex-col justify-end rounded-xl bg-gradient-to-b from-stone-200 via-stone-100 to-stone-50 p-5">
          <div className={`mx-auto h-28 w-32 rounded-md bg-gradient-to-br ${artwork.gradient}`} />
          <div className="mt-5 h-6 rounded-full bg-stone-300/80" />
        </div>
      </div>
    </section>
  );
}
