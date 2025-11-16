import { toDataUrl, type PredictResponse } from "@/lib/api";
import HeatmapOverlay from "@/components/HeatmapOverlay";

export default function ClassificationResult({ result, originalImage }: { result: PredictResponse, originalImage?: string }) {
    const entries = Object.entries(result.probabilities || {}).sort((a, b) => b[1] - a[1]);
    const top3 = entries.slice(0, 3);
    const maxProb = Math.max(...entries.map(([, p]) => p));

    return (
        <div className="card space-y-6" aria-labelledby="classification-heading">
            <div>
                <h3 id="classification-heading" className="font-semibold text-lg mb-2">Classification Result</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium">{result.predicted_class}</span>
                    <span className="text-xs text-muted">({(entries[0][1] * 100).toFixed(1)}% confident)</span>
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-muted mb-3">Top 3 Predictions</h4>
                <div className="space-y-3">
                    {top3.map(([cls, prob], idx) => (
                        <div key={cls} className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{cls}</span>
                                <span className="text-muted tabular-nums">{(prob * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700 ease-out"
                                    style={{
                                        width: `${(prob / maxProb) * 100}%`,
                                        background: idx === 0
                                            ? 'hsl(var(--theme-hue), 70%, 50%)'
                                            : `hsl(var(--theme-hue), ${50 - idx * 15}%, ${60 - idx * 10}%)`
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {result.xai_heatmap_base64 && originalImage && (
                <div>
                    <h4 className="text-sm font-medium text-muted mb-3">Explainability (XAI Heatmap)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-muted mb-2">Original Image</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={originalImage} alt="Original" className="rounded-md w-full border border-muted/20" />
                        </div>
                        <div>
                            <div className="text-xs text-muted mb-2">Attention Heatmap</div>
                            <HeatmapOverlay base64={result.xai_heatmap_base64} backgroundImage={originalImage} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
