"use client";

import { motion } from "framer-motion";
import type { ClinicalDecision } from "@/lib/api";

interface Props {
    decision: ClinicalDecision | undefined;
    confidence?: number;
}

export default function ClinicalDecisionSupport({ decision, confidence }: Props) {
    if (!decision) return null;

    const getRiskColor = (level: string) => {
        switch (level) {
            case "critical":
                return { bg: "from-red-600 to-rose-600", text: "text-red-600", badge: "bg-red-500/20 border-red-500/30" };
            case "high":
                return { bg: "from-orange-500 to-red-500", text: "text-orange-600", badge: "bg-orange-500/20 border-orange-500/30" };
            case "moderate":
                return { bg: "from-yellow-500 to-amber-500", text: "text-yellow-600", badge: "bg-yellow-500/20 border-yellow-500/30" };
            case "low":
                return { bg: "from-green-500 to-emerald-500", text: "text-green-600", badge: "bg-green-500/20 border-green-500/30" };
            default:
                return { bg: "from-gray-500 to-slate-500", text: "text-gray-600", badge: "bg-gray-500/20 border-gray-500/30" };
        }
    };

    const colors = getRiskColor(decision.risk_level);
    const normalizedConfidence = typeof confidence === "number" ? Math.max(0, Math.min(100, confidence)) : undefined;
    const confidenceTier = normalizedConfidence !== undefined
        ? normalizedConfidence >= 85
            ? "high"
            : normalizedConfidence >= 70
                ? "moderate"
                : "low"
        : undefined;
    const confidenceStatement = confidenceTier === "high"
        ? "High confidence: model predictions are consistent. Proceed with routine clinical validation."
        : confidenceTier === "moderate"
            ? "Moderate confidence: consider correlating with cytology and patient history."
            : confidenceTier === "low"
                ? "Low confidence: recommend manual review or repeat sampling."
                : "Confidence unavailable. Interpret results with caution.";
    const needsReview = decision.needs_review || (normalizedConfidence !== undefined && normalizedConfidence < 70);
    const reviewReason = decision.review_reason || (normalizedConfidence !== undefined && normalizedConfidence < 70
        ? "Low model confidence"
        : undefined);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6 relative overflow-hidden"
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-5 pointer-events-none`} />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Clinical Decision Support</h3>
                        <p className="text-sm text-muted mt-1">AI-assisted diagnosis and recommendations</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${colors.badge} border`}>
                        <p className={`text-sm font-bold ${colors.text} capitalize`}>{decision.risk_level} Risk</p>
                    </div>
                </div>
            </div>

            {/* Risk Gauge */}
            <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Risk Score</span>
                    <span className={`text-3xl font-bold text-transparent bg-gradient-to-r ${colors.bg} bg-clip-text`}>
                        {decision.risk_score.toFixed(1)}
                    </span>
                </div>
                <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${decision.risk_score}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${colors.bg}`}
                    />
                </div>
                <div className="flex justify-between text-xs text-muted">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                </div>
            </div>

            {/* Primary Classification */}
            <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                <h4 className="text-sm font-semibold">Primary Diagnosis</h4>
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                    <p className="text-2xl font-bold text-blue-400">{decision.primary_class}</p>
                    <p className="text-xs text-muted mt-2">
                        Primary classification based on model analysis
                    </p>
                </div>
            </div>

            {/* Confidence Interpretation */}
            <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                <h4 className="text-sm font-semibold">Confidence Interpretation</h4>
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted">Model confidence</p>
                        <p className="text-sm font-semibold text-[var(--color-fg)]">
                            {normalizedConfidence !== undefined ? `${normalizedConfidence.toFixed(1)}%` : "N/A"}
                        </p>
                    </div>
                    <p className="text-xs text-muted mt-2">{confidenceStatement}</p>
                </div>
            </div>

            {/* Secondary Candidates */}
            {decision.secondary_candidates.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                    <h4 className="text-sm font-semibold">Differential Diagnoses</h4>
                    <div className="space-y-2">
                        {decision.secondary_candidates.map((candidate, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted">{candidate.class}</span>
                                    <span className="font-mono font-bold">{(candidate.probability * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 bg-[var(--color-bg)] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${candidate.probability * 100}%` }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Clinical Recommendations */}
            {decision.recommendations.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                    <h4 className="text-sm font-semibold">Clinical Recommendations</h4>
                    <div className="space-y-2">
                        {decision.recommendations.map((rec, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                            >
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-muted leading-relaxed">{rec}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Review Alert */}
            {needsReview && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-amber-500/10 border-l-4 border-amber-500 space-y-2"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 6v2" />
                        </svg>
                        <p className="font-semibold text-amber-600">Clinical Review Recommended</p>
                    </div>
                    {reviewReason && (
                        <p className="text-sm text-muted ml-7">{reviewReason}</p>
                    )}
                </motion.div>
            )}

            {/* Confidence Note */}
            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-blue-400 font-semibold mb-1">Important</p>
                <p className="text-xs text-muted">
                    This assessment is for clinical decision support only. All findings should be confirmed by qualified pathologists and used in conjunction with clinical judgment.
                </p>
            </div>
        </motion.div>
    );
}
