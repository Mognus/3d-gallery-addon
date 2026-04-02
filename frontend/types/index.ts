export interface ModelAsset {
    id: number;
    name: string;
    modelUrl: string;
    canvasMeshName: string;
    defaultScale: number;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryImage {
    id: number;
    name: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryItem {
    id: number;
    title: string;
    modelAssetId: number;
    modelAsset: ModelAsset;
    imageId: number | null;
    image: GalleryImage | null;
    createdAt: string;
    updatedAt: string;
}
