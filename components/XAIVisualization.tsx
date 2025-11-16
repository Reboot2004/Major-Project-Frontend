import { toDataUrl } from "@/lib/api";

export default function XAIVisualization({ heatmapBase64 }: { heatmapBase64?: string }) {
    if (!heatmapBase64) return null;
    return (
        <div className="card">
            <h3 className="font-semibold mb-2">Explainability</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={toDataUrl(heatmapBase64)} alt="xai" className="rounded-md w-full" />
        </div>
    );
}
