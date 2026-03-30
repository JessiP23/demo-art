import type { Artwork, TasteProfile } from "../lib/artmatch-data";
import Image from "next/image";

type RoomPreviewProps = {
  artwork: Artwork;
  profile: TasteProfile;
  enabled: boolean;
  onToggle: () => void;
};

export function RoomPreview({ artwork, profile, enabled, onToggle }: RoomPreviewProps) {
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
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 rounded-full border border-black/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-black/75 transition hover:border-black/35"
        >
          {enabled ? "Hide preview overlay" : "Show preview overlay"}
        </button>
      </div>
      <div className="rounded-2xl border border-black/10 bg-stone-100 p-4">
        <div className="relative mx-auto h-[260px] max-w-lg overflow-hidden rounded-xl">
          <Image src="/room-mockup.png" alt="Collector living room" fill className="object-cover" />
          {enabled ? (
            <div className="absolute inset-x-[30%] top-[19%] bottom-[34%] rounded-sm border border-white/55 shadow-2xl">
              <Image
                src={artwork.image}
                alt={`${artwork.title} in room preview`}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
