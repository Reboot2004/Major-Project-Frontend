import { toDataUrl, type PredictResponse } from "@/lib/api";
import SegmentationBlend from "@/components/SegmentationBlend";
import HeatmapOverlay from "@/components/HeatmapOverlay";

export default function SegmentationResult({ result, original }: { result: PredictResponse, original?: string }) {
    const maskUrl = toDataUrl(result.segmentation_mask_base64);
    const heatmapUrl = toDataUrl(result.xai_heatmap_base64);

    return (
        <div className="card space-y-6" aria-labelledby="segmentation-heading">
            <div>
                <h3 id="segmentation-heading" className="font-semibold text-lg mb-1">Segmentation Result</h3>
                <p className="text-sm text-muted">Attention U-Net nucleus boundary detection</p>
            </div>

            {result.metrics && (
                <div className="flex gap-6 text-sm">
                    {result.metrics.iou && (
                        <div>
                            <span className="text-muted">IoU:</span>
                            <span className="ml-2 font-medium tabular-nums">{(result.metrics.iou * 100).toFixed(1)}%</span>
                        </div>
                    )}
                    {result.metrics.dice && (
                        <div>
                            <span className="text-muted">Dice:</span>
                            <span className="ml-2 font-medium tabular-nums">{(result.metrics.dice * 100).toFixed(1)}%</span>
                        </div>
                    )}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                {original && (
                    <div>
                        <div className="text-xs text-muted mb-2 font-medium">Original Image</div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={original} alt="Original input" className="rounded-md w-full border border-muted/20" />
                    </div>
                )}
                {maskUrl && (
                    <div>
                        <div className="text-xs text-muted mb-2 font-medium">Predicted Mask</div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={maskUrl} alt="Segmentation mask" className="rounded-md w-full border border-muted/20" />
                    </div>
                )}
                {original && maskUrl && (
                    <div>
                        <div className="text-xs text-muted mb-2 font-medium">Overlay Blend</div>
                        <SegmentationBlend original={original} mask={maskUrl} />
                    </div>
                )}
            </div>

            {heatmapUrl && original && (
                <div>
                    <h4 className="text-sm font-medium text-muted mb-3">Attention U-Net Heatmap (XAI)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-muted mb-2">Heatmap Only</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={heatmapUrl} alt="Attention heatmap" className="rounded-md w-full border border-muted/20" />
                        </div>
                        <div>
                            <div className="text-xs text-muted mb-2">Heatmap Overlay</div>
                            <HeatmapOverlay base64={result.xai_heatmap_base64!} backgroundImage={original} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
