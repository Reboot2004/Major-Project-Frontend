"use client";

import { motion } from "framer-motion";
import { toDataUrl, type PredictResponse } from "@/lib/api";
import HeatmapOverlay from "@/components/HeatmapOverlay";

export default function ClassificationResult({ result, originalImage }: { result: PredictResponse, originalImage?: string }) {
    const entries = Object.entries(result.probabilities || {}).sort((a, b) => b[1] - a[1]);
    const top3 = entries.slice(0, 3);
    const maxProb = Math.max(...entries.map(([, p]) => p));

    const getRiskLevel = (className: string) => {
        const highRisk = ['Dyskeratotic', 'Koilocytotic'];
        return highRisk.includes(className) ? 'high' : 'low';
    };

    const riskLevel = getRiskLevel(result.predicted_class);

    return (
        <motion.div
            className="card space-y-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-labelledby="classification-heading"
        >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <motion.h3
                        id="classification-heading"
                        className="font-semibold text-xl flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Classification Result
                    </motion.h3>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${riskLevel === 'high'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                            }`}
                    >
                        {riskLevel === 'high' ? 'High Risk' : 'Low Risk'}
                    </motion.div>
                </div>

                <motion.div
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                >
                    <motion.div
                        className="w-3 h-3 rounded-full bg-accent"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold">{result.predicted_class}</span>
                        <span className="text-xs text-muted">Confidence: {(entries[0][1] * 100).toFixed(2)}%</span>
                    </div>
                </motion.div>
            </div>

            <div className="relative">
                <h4 className="text-sm font-semibold text-muted mb-4 uppercase tracking-wider">Probability Distribution</h4>
                <div className="space-y-4">
                    {top3.map(([cls, prob], idx) => (
                        <motion.div
                            key={cls}
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{
                                            background: idx === 0
                                                ? 'hsl(var(--theme-hue), 70%, 50%)'
                                                : `hsl(var(--theme-hue), ${50 - idx * 15}%, ${60 - idx * 10}%)`
                                        }}
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                                    />
                                    <span className={idx === 0 ? "font-semibold" : "font-medium text-muted"}>{cls}</span>
                                </div>
                                <motion.span
                                    className="font-mono font-semibold tabular-nums"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                >
                                    {(prob * 100).toFixed(2)}%
                                </motion.span>
                            </div>
                            <div className="relative h-2.5 bg-[var(--color-border)]/30 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                    className="absolute inset-y-0 left-0 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(prob / maxProb) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.6 + idx * 0.1, ease: "easeOut" }}
                                    style={{
                                        background: idx === 0
                                            ? 'linear-gradient(90deg, hsl(var(--theme-hue), 70%, 50%), hsl(var(--theme-hue), 80%, 45%))'
                                            : `linear-gradient(90deg, hsl(var(--theme-hue), ${50 - idx * 15}%, ${60 - idx * 10}%), hsl(var(--theme-hue), ${50 - idx * 15}%, ${50 - idx * 10}%))`
                                    }}
                                />
                                {idx === 0 && (
                                    <motion.div
                                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ["-100%", "400%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {(result.xai_scorecam_base64 || result.xai_layercam_base64) && originalImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="relative pt-6 border-t border-[var(--color-border)]"
                >
                    <h4 className="text-sm font-semibold text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Explainability Analysis (XAI)
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="text-xs text-muted mb-2 font-medium">Original Image</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={originalImage} alt="Original" className="rounded-lg w-full border border-[var(--color-border)] shadow-lg" />
                        </motion.div>
                        {result.xai_scorecam_base64 && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-xs text-muted mb-2 font-medium">ScoreCAM</div>
                                <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] shadow-lg">
                                    <HeatmapOverlay base64={result.xai_scorecam_base64} backgroundImage={originalImage} />
                                </div>
                            </motion.div>
                        )}
                        {result.xai_layercam_base64 && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-xs text-muted mb-2 font-medium">LayerCAM</div>
                                <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] shadow-lg">
                                    <HeatmapOverlay base64={result.xai_layercam_base64} backgroundImage={originalImage} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <motion.p
                        className="text-xs text-muted mt-3 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        The heatmap highlights regions the AI model focused on for its prediction, providing transparency into the decision-making process.
                    </motion.p>
                </motion.div>
            )}
        </motion.div>
    );
}
