"use client";

import dynamic from "next/dynamic";
import { useGalleryItems } from "../hooks/useGalleryItems";

const GalleryScene = dynamic(
    () => import("../components/GalleryScene").then((mod) => mod.GalleryScene),
    { ssr: false }
);

export default function GalleryPage() {
    const { data, isLoading, error } = useGalleryItems();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-lg border bg-card h-64 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-destructive">Fehler beim Laden der Gallery.</div>;
    }

    const items = data?.items ?? [];

    if (items.length === 0) {
        return <div className="text-muted-foreground">Keine Gallery-Items vorhanden.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden border bg-card h-64">
                    <GalleryScene
                        modelUrl={item.modelAsset.modelUrl}
                        canvasMeshName={item.modelAsset.canvasMeshName || undefined}
                        imageUrl={item.image?.url}
                        scale={item.modelAsset.defaultScale}
                        className="w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}
