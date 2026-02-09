"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { HistoricalPrediction } from "@/lib/api";
import { getOldPredictions, downloadHistoricalPdf } from "@/lib/api";

function getClassificationStyle(classification?: string) {
    const baseClasses =
        "inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] md:text-xs font-medium transition-colors";

    if (!classification) {
        return {
            status: "Unknown",
            classes: `${baseClasses} border-[var(--color-border)] bg-[var(--color-border)]/30 text-muted`
        };
    }

    const value = classification.toLowerCase();

    if (value.includes("koilocytotic") || value.includes("dyskeratotic")) {
        return {
            status: "Abnormal",
            classes: `${baseClasses} border-red-500/60 bg-red-500/5 text-red-500 dark:text-red-200`
        };
    }

    if (value.includes("parabasal") || value.includes("superficial") || value.includes("intermediate")) {
        return {
            status: "Normal",
            classes: `${baseClasses} border-emerald-500/60 bg-emerald-500/5 text-emerald-600 dark:text-emerald-200`
        };
    }

    if (value.includes("metaplastic")) {
        return {
            status: "Benign",
            classes: `${baseClasses} border-amber-400/60 bg-amber-400/5 text-amber-600 dark:text-amber-100`
        };
    }

    return {
        status: "Unknown",
        classes: `${baseClasses} border-[var(--color-border)] bg-[var(--color-border)]/30 text-muted`
    };
}

export default function ResultsPage() {
    const [predictions, setPredictions] = useState<HistoricalPrediction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getOldPredictions();
                if (mounted) {
                    setPredictions(data ?? []);
                }
            } catch (e: any) {
                if (mounted) {
                    setError(e?.message || "Failed to load previous predictions");
                }
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-3">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-border)]/40 text-xs font-semibold text-[var(--color-accent)] border border-[var(--color-border)]"
                >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    Previous Predictions
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                    Historical Analysis Results
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm md:text-base text-muted max-w-2xl"
                >
                   This section displays saved prediction runs from earlier analyses.
                </motion.p>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
                    </div>
                    <p className="text-xs md:text-sm text-muted">Loading previous predictions…</p>
                </div>
            )}

            {!loading && error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-red-500/40 bg-red-500/10 text-xs md:text-sm text-red-200"
                >
                    {error}
                </motion.div>
            )}

            {!loading && !error && predictions.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 space-y-3"
                >
                    <div className="text-5xl opacity-10">∅</div>
                    <p className="text-sm text-muted">No previous predictions found yet. Run the demo to create your first analysis.</p>
                </motion.div>
            )}

            {!loading && !error && predictions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <p className="text-xs md:text-sm text-muted">
                        Showing <span className="font-semibold text-[var(--color-fg)]">{predictions.length}</span> previous prediction
                        {predictions.length > 1 ? "s" : ""} (most recent first).
                    </p>
                    <div className="space-y-3">
                        {predictions.map((p, index) => (
                            <motion.div
                                key={p.id ?? index}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.02 * index }}
                                className="card border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60"
                            >
                                {(() => {
                                    const style = getClassificationStyle(p.classification);
                                    const patientId = p.patient_id ?? p.id;
                                    const isExpanded = expandedId === p.id;

                                    const uncertainty: any = (p as any).uncertainty || (p as any).uncertainty_metrics || null;
                                    const clinical: any = (p as any).clinical_decision || null;

                                    const rawConfidence =
                                        uncertainty != null ? Number(uncertainty.confidence) : NaN;
                                    const confidenceFraction =
                                        Number.isFinite(rawConfidence)
                                            ? rawConfidence > 1
                                                ? rawConfidence / 100
                                                : rawConfidence
                                            : NaN;
                                    const confidenceValue =
                                        Number.isFinite(confidenceFraction)
                                            ? confidenceFraction * 100
                                            : NaN;
                                    const entropyValue = uncertainty != null
                                        ? Number(uncertainty.entropy_normalized ?? uncertainty.entropy)
                                        : NaN;
                                    const overallUncertainty = uncertainty != null
                                        ? Number(uncertainty.overall_uncertainty)
                                        : NaN;
                                    const riskScoreValue = clinical != null ? Number(clinical.risk_score) : NaN;

                                    const quality: any = (p as any).quality || null;

                                    const hasConfidence = Number.isFinite(confidenceValue);
                                    let confidenceLevel: string | null = null;
                                    let confidenceHighlightClass =
                                        "border-[var(--color-border)] bg-[var(--color-border)]/30 text-[var(--color-fg)]";

                                    if (hasConfidence) {
                                        if (confidenceValue >= 85) {
                                            confidenceLevel = "High confidence";
                                            confidenceHighlightClass =
                                                "border-emerald-500/70 bg-emerald-500/10 text-emerald-300";
                                        } else if (confidenceValue >= 60) {
                                            confidenceLevel = "Moderate confidence";
                                            confidenceHighlightClass =
                                                "border-amber-400/70 bg-amber-400/10 text-amber-200";
                                        } else {
                                            confidenceLevel = "Low confidence";
                                            confidenceHighlightClass =
                                                "border-red-500/70 bg-red-500/10 text-red-200";
                                        }
                                    }

                                    return (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setExpandedId(prev => (prev === p.id ? null : p.id))}
                                                className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 px-3 py-3 md:px-4 md:py-4 cursor-pointer hover:border-[var(--color-accent)]/70 hover:bg-[var(--color-bg-alt)]/80 transition-colors text-left"
                                            >
                                                <div className="space-y-1">
                                                    <div className="text-xs md:text-sm font-medium text-[var(--color-fg)]">
                                                        {p.patient_name || "Unknown Patient"}
                                                    </div>
                                                    <div className="text-[11px] md:text-xs text-muted flex flex-wrap gap-2 items-center">
                                                        {patientId && <span>Patient ID: {patientId}</span>}
                                                        {p.timestamp && <span>• {p.timestamp}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={style.classes}>
                                                        <span>{p.classification || "Unclassified"}</span>
                                                        <span className="opacity-75">· {style.status}</span>
                                                    </span>
                                                    <span className="text-[10px] md:text-xs text-muted">
                                                        {isExpanded ? "Hide details" : "View details"}
                                                    </span>
                                                </div>
                                            </button>

                                            {isExpanded && (
                                                <div className="border-t border-[var(--color-border)]/70 px-3 py-4 md:px-4 md:py-5 space-y-6">
                                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                                        <h3 className="text-xs md:text-sm font-semibold">
                                                            Detailed Case View
                                                        </h3>
                                                        {p.id && (
                                                            <button
                                                                type="button"
                                                                onClick={e => {
                                                                    e.stopPropagation();
                                                                    downloadHistoricalPdf(p.id).catch(err => {
                                                                        console.error("PDF download failed", err);
                                                                        alert("Failed to download report. Please try again.");
                                                                    });
                                                                }}
                                                                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] md:text-xs border border-[var(--color-accent)]/70 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
                                                            >
                                                                <span>Download Full Report</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                    {/* Summary metrics only (no images) */}
                                                    <section className="space-y-2">
                                                        <h3 className="text-xs md:text-sm font-semibold">Prediction Summary</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] md:text-xs">
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Predicted Class</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {p.classification || "Unclassified"}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Clinical Category</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {style.status}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Needs Review</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {clinical?.needs_review === true
                                                                        ? "Yes"
                                                                        : clinical?.needs_review === false
                                                                        ? "No"
                                                                        : "Not available"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    {/* Confidence & Uncertainty */}
                                                    <section className="space-y-2">
                                                        <h3 className="text-xs md:text-sm font-semibold">
                                                            Confidence & Uncertainty Analysis
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] md:text-xs">
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Confidence</div>
                                                                {hasConfidence ? (
                                                                    <div className="flex items-baseline gap-2">
                                                                        <span
                                                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] md:text-xs font-semibold shadow-sm ${confidenceHighlightClass}`}
                                                                        >
                                                                            <span>{confidenceValue.toFixed(1)}%</span>
                                                                        </span>
                                                                        {confidenceLevel && (
                                                                            <span className="text-[10px] md:text-[11px] text-muted">
                                                                                {confidenceLevel}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="font-medium text-[var(--color-fg)]">
                                                                        Not available
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Entropy (uncertainty)</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {Number.isFinite(entropyValue)
                                                                        ? entropyValue.toFixed(3)
                                                                        : "Not available"}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Reliability Flag</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {uncertainty?.is_reliable === true
                                                                        ? "Model considers this prediction reliable"
                                                                        : uncertainty
                                                                        ? "Use with caution"
                                                                        : "Not available"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {Number.isFinite(overallUncertainty) && (
                                                            <p className="text-[10px] text-muted">
                                                                Overall uncertainty score: {overallUncertainty.toFixed(3)} (0
                                                                = low, 1 = high).
                                                            </p>
                                                        )}
                                                        <div className="text-[10px] text-muted space-y-1 mt-1">
                                                            <p className="font-medium text-[var(--color-fg)]">
                                                                Stability & Interpretation Guide
                                                            </p>
                                                            <ul className="list-disc list-inside space-y-1">
                                                                <li>
                                                                    Higher confidence together with lower entropy usually
                                                                    means the model is giving a more stable, internally
                                                                    consistent prediction.
                                                                </li>
                                                                <li>
                                                                    Moderate confidence or mixed entropy values suggest the
                                                                    result should be treated as supportive evidence rather
                                                                    than a standalone decision.
                                                                </li>
                                                                <li>
                                                                    Very low confidence or high overall uncertainty indicate
                                                                    that manual review and correlation with full clinical
                                                                    context are especially important.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </section>

                                                    {/* Clinical Decision Support */}
                                                    <section className="space-y-2">
                                                        <h3 className="text-xs md:text-sm font-semibold">
                                                            Clinical Decision Support
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] md:text-xs">
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Risk Level</div>
                                                                <div className="font-semibold text-[var(--color-fg)]">
                                                                    {clinical?.risk_level || "Not available"}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Risk Score</div>
                                                                <div className="font-medium text-[var(--color-fg)]">
                                                                    {Number.isFinite(riskScoreValue)
                                                                        ? `${riskScoreValue.toFixed(1)} / 100`
                                                                        : "Not available"}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="text-muted">Primary Diagnosis</div>
                                                                <div className="font-semibold text-[var(--color-accent)]">
                                                                    {clinical?.primary_class || p.classification ||
                                                                        "Not available"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {clinical?.recommendations && (
                                                            <div className="text-[10px] text-muted space-y-1 mt-1">
                                                                <p className="font-medium text-[var(--color-fg)]">
                                                                    Model Recommendations
                                                                </p>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                    {clinical.recommendations.map(
                                                                        (r: string, idx: number) => (
                                                                            <li key={idx}>{r}</li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        <p className="text-[10px] text-muted border-t border-[var(--color-border)]/60 pt-2 mt-1">
                                                            Primary diagnosis (for example, Parabasal) is based on model
                                                            analysis and should always be integrated with
                                                            cytopathologist judgment and full clinical context.
                                                        </p>
                                                    </section>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
