"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateRoomPreview } from "@/lib/engines";
import { useArtwork } from "@/lib/queries";
import { UploadButton } from "@/lib/uploadthing";
import { useAppStore } from "@/stores/app-store";

export default function RoomPreviewPage() {
  const params = useParams<{ id: string }>();
  const artworkQuery = useArtwork(params.id);
  const artwork = artworkQuery.data;
  const { roomImageUrl, setRoomImageUrl } = useAppStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const roomPreview = useMemo(() => previewUrl ?? roomImageUrl, [previewUrl, roomImageUrl]);

  const runPreview = async () => {
    if (!artwork) return;
    setLoading(true);
    const response = await generateRoomPreview({
      artworkUrl: artwork.image_url,
      roomImageUrl,
    });
    setPreviewUrl(response.previewUrl);
    setLoading(false);
  };

  return (
    <AuthGuard>
      <PageShell
        title="Room intelligence"
        subtitle="Upload your room image and generate composition preview with AI staging."
      >
        {!artwork ? null : (
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">Room upload</p>
                <UploadButton
                  endpoint="roomImageUploader"
                  appearance={{
                    button:
                      "ut-uploading:cursor-not-allowed rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white",
                    container: "w-full",
                  }}
                  onClientUploadComplete={(result) => {
                    const nextUrl = result[0]?.url;
                    if (nextUrl) setRoomImageUrl(nextUrl);
                  }}
                />
                <p className="text-xs text-black/60 dark:text-white/60">
                  Uploadthing handles room image transfer. Then run AI preview.
                </p>
                <Button onClick={runPreview} disabled={loading}>
                  {loading ? "Generating preview..." : "Generate room preview"}
                </Button>
                <Badge className="normal-case tracking-normal">Model: stable-diffusion-mock-v1</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">Preview output</p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10">
                  <Image src={roomPreview} alt="Room preview" fill className="object-cover" />
                </div>
                <p className="text-sm text-black/70 dark:text-white/70">
                  Artwork: {artwork.title} by {artwork.artist}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </PageShell>
    </AuthGuard>
  );
}
