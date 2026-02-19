"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    originalImageBase64: string;
    scoreCAMBase64?: string;
    layerCAMBase64?: string;
}

type HeatmapMode = "overlay" | "masked" | "heatmap_only";

export default function AdvancedXAIVisualization({
    originalImageBase64,
    scoreCAMBase64,
    layerCAMBase64
}: Props) {
    const [selectedHeatmap, setSelectedHeatmap] = useState<"scorecam" | "layercam">("scorecam");
    const [opacity, setOpacity] = useState(70);
    const [mode, setMode] = useState<HeatmapMode>("overlay");
    const [showComparison, setShowComparison] = useState(false);

    const currentHeatmap = selectedHeatmap === "scorecam" ? scoreCAMBase64 : layerCAMBase64;

    if (!scoreCAMBase64 && !layerCAMBase64) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card space-y-4"
            >
                <div className="text-center py-8">
                    <p className="text-lg font-semibold">XAI Visualizations Unavailable</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6"
        >
            <div>
                <h3 className="text-xl font-bold">Explainable AI (XAI) Visualization</h3>
                <p className="text-sm text-muted mt-1">Inspect where the model focused.</p>
            </div>

            {/* Controls */}
            <div className="space-y-4 p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                {/* Heatmap Selection */}
                <div className="space-y-2">
                    <p className="text-sm font-semibold">Visualization Method</p>
                    <div className="flex gap-2">
                        {scoreCAMBase64 && (
                            <motion.button
                                onClick={() => setSelectedHeatmap("scorecam")}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 px-4 py-2 rounded-lg transition-all ${selectedHeatmap === "scorecam"
                                    ? "bg-blue-500 text-white"
                                    : "bg-[var(--color-border)] text-muted hover:bg-[var(--color-border)]"
                                    }`}
                            >
                                Score-CAM
                            </motion.button>
                        )}
                        {layerCAMBase64 && (
                            <motion.button
                                onClick={() => setSelectedHeatmap("layercam")}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 px-4 py-2 rounded-lg transition-all ${selectedHeatmap === "layercam"
                                    ? "bg-purple-500 text-white"
                                    : "bg-[var(--color-border)] text-muted hover:bg-[var(--color-border)]"
                                    }`}
                            >
                                Layer-CAM
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Display Mode */}
                <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
                    <p className="text-sm font-semibold">Display Mode</p>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: "overlay", label: "Overlay" },
                            { id: "masked", label: "Masked" },
                            { id: "heatmap_only", label: "Heatmap" }
                        ].map((m) => (
                            <motion.button
                                key={m.id}
                                onClick={() => setMode(m.id as HeatmapMode)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-2 rounded-lg transition-all text-xs font-semibold flex flex-col items-center gap-1 ${mode === m.id
                                    ? "bg-accent text-[var(--color-fg)]"
                                    : "bg-[var(--color-border)] text-muted hover:text-[var(--color-fg)]"
                                    }`}
                            >
                                {m.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Opacity Control */}
                <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Heatmap Opacity</p>
                        <span className="font-mono text-sm font-bold text-accent">{opacity}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, var(--color-border) 0%, var(--color-border) ${opacity}%, var(--color-fg) ${opacity}%, var(--color-fg) 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs text-muted">
                        <span>Transparent</span>
                        <span>Opaque</span>
                    </div>
                </div>

                {/* Comparison Toggle */}
                <div className="border-t border-[var(--color-border)] pt-4">
                    <motion.button
                        onClick={() => setShowComparison(!showComparison)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
                    >
                        {showComparison ? "Hide" : "Show"} Side-by-Side Comparison
                    </motion.button>
                </div>
            </div>

            {/* Single View */}
            {!showComparison && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                >
                    <p className="text-xs font-semibold text-muted uppercase">
                        {selectedHeatmap === "scorecam" ? "Score-CAM Activation Map" : "Layer-CAM Activation Map"}
                    </p>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]">
                        {/* Base image */}
                        <img
                            src={`data:image/png;base64,${originalImageBase64}`}
                            alt="Original"
                            className={`absolute inset-0 w-full h-full object-cover ${mode === "heatmap_only" ? "opacity-0" : "opacity-100"
                                }`}
                        />

                        {/* Heatmap overlay */}
                        {currentHeatmap && (
                            <img
                                src={`data:image/png;base64,${currentHeatmap}`}
                                alt="Heatmap"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ opacity: opacity / 100 }}
                            />
                        )}

                        {/* Masking overlay */}
                        {mode === "masked" && (
                            <div className="absolute inset-0 bg-black" style={{ opacity: (100 - opacity) / 100 }} />
                        )}
                    </div>
                </motion.div>
            )}

            {/* Comparison View */}
            <AnimatePresence>
                {showComparison && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-[var(--color-border)]"
                    >
                        <p className="text-xs font-semibold text-muted uppercase">Side-by-Side Comparison</p>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Original */}
                            <div className="space-y-2">
                                <p className="text-xs text-muted">Original Image</p>
                                <img
                                    src={`data:image/png;base64,${originalImageBase64}`}
                                    alt="Original"
                                    className="w-full aspect-square rounded-lg border border-[var(--color-border)] object-cover"
                                />
                            </div>

                            {/* Heatmap */}
                            {currentHeatmap && (
                                <div className="space-y-2">
                                    <p className="text-xs text-muted">
                                        {selectedHeatmap === "scorecam" ? "Score-CAM" : "Layer-CAM"}
                                    </p>
                                    <img
                                        src={`data:image/png;base64,${currentHeatmap}`}
                                        alt="Heatmap"
                                        className="w-full aspect-square rounded-lg border border-[var(--color-border)] object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Show both heatmaps if available */}
                        {scoreCAMBase64 && layerCAMBase64 && selectedHeatmap === "scorecam" && (
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)]">
                                <div className="space-y-2">
                                    <p className="text-xs text-muted">Score-CAM</p>
                                    <img
                                        src={`data:image/png;base64,${scoreCAMBase64}`}
                                        alt="Score-CAM"
                                        className="w-full aspect-square rounded-lg border border-[var(--color-border)] object-cover"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-muted">Layer-CAM</p>
                                    <img
                                        src={`data:image/png;base64,${layerCAMBase64}`}
                                        alt="Layer-CAM"
                                        className="w-full aspect-square rounded-lg border border-[var(--color-border)] object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Explanation */}
            <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <h4 className="font-semibold text-sm">What These Visualizations Show</h4>
                <div className="space-y-3 text-sm text-muted">
                    <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-1">
                        <p className="font-semibold text-blue-400">Score-CAM</p>
                        <p>Highlights the regions most influential for prediction.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-1">
                        <p className="font-semibold text-purple-400">Layer-CAM</p>
                        <p>Shows intermediate feature focus from deeper layers.</p>
                    </div>
                </div>

                <details className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2">
                    <summary className="cursor-pointer text-xs font-semibold text-muted">More details</summary>
                    <p className="text-xs text-muted mt-2">
                        Warmer colors indicate stronger contribution. Use XAI as interpretability support, not as a standalone clinical decision signal.
                    </p>
                </details>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs text-amber-400 font-semibold mb-1">Clinical Note</p>
                <p className="text-xs text-muted">Use with clinical review and other findings.</p>
            </div>
        </motion.div>
    );
}
