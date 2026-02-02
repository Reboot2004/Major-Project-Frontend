"use client";

import { motion } from "framer-motion";
import type { SegmentationMetrics } from "@/lib/api";

interface Props {
    metrics: SegmentationMetrics | undefined;
}

export default function SegmentationMetricsDisplay({ metrics }: Props) {
    if (!metrics) return null;

    const MetricCard = ({ label, value, suffix = "%", color, icon }: { label: string; value: number; suffix?: string; color: string; icon?: string }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-bg)] rounded-lg p-4 space-y-2 border border-[var(--color-border)]"
        >
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted font-semibold uppercase tracking-wide">{label}</p>
                {icon ? <span className="text-lg">{icon}</span> : null}
            </div>
            <div className="space-y-1">
                <div className={`text-2xl font-bold text-transparent bg-gradient-to-r ${color} bg-clip-text`}>
                    {suffix === "%" ? (value * 100).toFixed(1) : value.toFixed(0)}{suffix}
                </div>
                <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, suffix === "%" ? value * 100 : value)}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${color}`}
                    />
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6"
        >
            <div>
                <h3 className="text-xl font-bold">Segmentation Metrics</h3>
                <p className="text-sm text-muted mt-1">Detailed quality assessment of segmentation</p>
            </div>

            {/* Simplified Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <MetricCard
                    label="Coverage"
                    value={metrics.coverage_ratio}
                    color="from-cyan-500 to-cyan-600"
                />
                <MetricCard
                    label="Cells"
                    value={metrics.num_cells}
                    suffix=""
                    color="from-green-500 to-green-600"
                />
                <MetricCard
                    label="Avg Size"
                    value={metrics.avg_cell_size}
                    suffix=""
                    color="from-blue-500 to-blue-600"
                />
                <MetricCard
                    label="Complexity"
                    value={metrics.edge_density}
                    color="from-orange-500 to-orange-600"
                />
                <MetricCard
                    label="Solidity"
                    value={metrics.avg_solidity}
                    color="from-purple-500 to-purple-600"
                />
            </div>

            {/* Overall Metrics */}
            <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <h4 className="text-sm font-semibold">Overall Performance</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Overall Accuracy</span>
                        <span className="font-mono font-bold text-lg">{(metrics.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metrics.accuracy * 100}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-[var(--color-border)] text-xs text-muted">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>Coverage: proportion of segmented area</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>Complexity: edge density of boundaries</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Solidity: compactness of segments</span>
                </div>
            </div>

            {/* Quality Assessment */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 space-y-2">
                <p className="text-xs font-semibold text-emerald-400">Segmentation Quality</p>
                <p className="text-xs text-muted leading-relaxed">
                    {metrics.coverage_ratio > 0.6
                        ? "Good segmentation coverage with compact regions."
                        : metrics.coverage_ratio > 0.3
                            ? "Fair coverage. Boundaries may be diffuse."
                            : "Low coverage. Consider re-scan or expert review."}
                </p>
            </div>
        </motion.div>
    );
}
