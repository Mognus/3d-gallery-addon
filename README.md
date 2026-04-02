# 3d-gallery-addon

Frontend Add-On for the NextJS-Go Template. Renders a 3D gallery — each gallery item is displayed as a picture frame in a Three.js/React Three Fiber scene, with a configurable 3D model and an optional image texture.

**Backend dependency:** [`gallery-service`](https://github.com/Mognus/gallery-service) — gRPC microservice running on `GALLERY_SERVICE_ADDR` (default `localhost:50052`), exposed via the backend API gateway at `/api/gallery/`.

---

## What's included

```
frontend/
  components/
    GalleryScene.tsx    ← R3F canvas scene for a single gallery item
    PictureFrame.tsx    ← 3D picture frame mesh component
  hooks/
    useGalleryItems.ts  ← Fetch paginated gallery items from the API
  pages/
    gallery.tsx         ← Full gallery page — grid of GalleryScene instances
  types/
    index.ts            ← GalleryItem, ModelAsset, GalleryImage
  index.ts              ← Barrel export
```

---

## Setup

### 1. Add as submodule

```bash
git submodule add https://github.com/Mognus/3d-gallery-addon frontend/addons/3d-gallery-addon
```

### 2. Install peer dependencies

The addon requires Three.js and React Three Fiber:

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### 3. Add the gallery route

```tsx
// app/[locale]/(app)/gallery/page.tsx
export { default } from "@/addons/3d-gallery-addon/frontend/pages/gallery";
```

The page is a Client Component and uses `dynamic` import with `ssr: false` for the Three.js canvas — no additional configuration needed.

### 4. Use individual components

To embed a single gallery item scene elsewhere:

```tsx
import dynamic from "next/dynamic";

const GalleryScene = dynamic(
    () => import("@/addons/3d-gallery-addon/frontend/components/GalleryScene").then(m => m.GalleryScene),
    { ssr: false }
);

<GalleryScene
    modelUrl="/models/frame.glb"
    imageUrl="/uploads/photo.jpg"
    scale={1.0}
    className="w-full h-64"
/>
```

---

## Environment

The backend API gateway must expose:

| Endpoint | Method | Description |
|---|---|---|
| `/api/gallery/items` | GET | Paginated gallery items with nested model + image |
