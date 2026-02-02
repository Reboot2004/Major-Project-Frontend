"use client";

import { motion } from "framer-motion";
import type { UncertaintyMetrics } from "@/lib/api";

interface Props {
    uncertainty: UncertaintyMetrics | undefined;
}

export default function UncertaintyDisplay({ uncertainty }: Props) {
    if (!uncertainty) return null;

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 90) return "from-green-500 to-emerald-500";
        if (confidence >= 70) return "from-blue-500 to-cyan-500";
        if (confidence >= 50) return "from-yellow-500 to-orange-500";
        return "from-red-500 to-rose-500";
    };

    const getConfidenceLabel = (confidence: number) => {
        if (confidence >= 90) return "Very High";
        if (confidence >= 70) return "High";
        if (confidence >= 50) return "Moderate";
        return "Low";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6"
        >
            <div>
                <h3 className="text-xl font-bold">Confidence & Uncertainty Analysis</h3>
                <p className="text-sm text-muted mt-1">Prediction reliability metrics</p>
            </div>

            {/* Main Confidence Gauge */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Prediction Confidence</span>
                    <span className={`text-2xl font-bold text-transparent bg-gradient-to-r ${getConfidenceColor(uncertainty.confidence)} bg-clip-text`}>
                        {uncertainty.confidence.toFixed(1)}%
                    </span>
                </div>
                <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uncertainty.confidence}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${getConfidenceColor(uncertainty.confidence)}`}
                    />
                </div>
                <p className={`text-xs font-semibold ${getConfidenceColor(uncertainty.confidence).split(" ")[1]}`}>
                    {getConfidenceLabel(uncertainty.confidence)} Confidence
                </p>
            </div>

            {/* Uncertainty Bounds */}
            <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                <h4 className="text-sm font-semibold">Confidence Interval (95%)</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Lower Bound</span>
                        <span className="font-mono font-bold">{(uncertainty.uncertainty_lower * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-[var(--color-bg)] rounded-full relative overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                left: `${uncertainty.uncertainty_lower * 100}%`,
                                width: `${(uncertainty.uncertainty_upper - uncertainty.uncertainty_lower) * 100}%`,
                            }}
                            transition={{ duration: 0.8 }}
                            className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-60"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Upper Bound</span>
                        <span className="font-mono font-bold">{(uncertainty.uncertainty_upper * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            {/* Prediction Entropy */}
            <div className="space-y-2 pt-3 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Prediction Entropy</span>
                    <span className="font-mono font-bold">{uncertainty.entropy.toFixed(3)}</span>
                </div>
                <p className="text-xs text-muted">
                    {uncertainty.entropy < 0.5
                        ? "Low entropy - Confident, focused prediction"
                        : uncertainty.entropy < 1.0
                            ? "Moderate entropy - Moderate uncertainty"
                            : "High entropy - Uncertain, diffuse prediction"}
                </p>
            </div>

            {/* Prediction Stability */}
            <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Stability Score</span>
                    <span className={`text-lg font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text`}>
                        {uncertainty.prediction_stability}%
                    </span>
                </div>
                <div className="h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uncertainty.prediction_stability}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                </div>
                <p className="text-xs text-muted">
                    Consistency across input variations and augmentations
                </p>
            </div>

            {/* Interpretation */}
            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-2">
                <p className="text-xs font-semibold text-blue-400">Interpretation Guide</p>
                <ul className="text-xs text-muted space-y-1">
                    <li>• High confidence + low entropy = Reliable prediction</li>
                    <li>• Low confidence + high entropy = Review recommended</li>
                    <li>• Low stability = Be cautious with slight variations</li>
                </ul>
            </div>
        </motion.div>
    );
}
