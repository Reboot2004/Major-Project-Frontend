"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MultiCellDetectionResult } from "@/lib/api";

interface Props {
    detection: MultiCellDetectionResult | undefined;
}

export default function MultiCellDetection({ detection }: Props) {
    const [selectedCell, setSelectedCell] = useState<number>(0);

    const cells = detection?.cells ?? [];
    const totalCells = detection?.total_cells ?? cells.length;

    useEffect(() => {
        setSelectedCell(0);
    }, [totalCells, cells.length]);

    if (!detection || totalCells === 0 || cells.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card space-y-4"
            >
                <div className="text-center py-8 space-y-2">
                    <p className="text-lg font-semibold">No Multiple Cells Detected</p>
                    <p className="text-sm text-muted">Single cell image detected and processed</p>
                </div>
            </motion.div>
        );
    }

    const safeIndex = Math.min(selectedCell, Math.max(cells.length - 1, 0));
    const selected = cells[safeIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6"
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold">Multi-Cell Detection</h3>
                    <p className="text-sm text-muted mt-1">Detected cells in image</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <p className="text-sm font-bold text-blue-400">{totalCells} cells</p>
                </div>
            </div>

            {/* Image with bounding boxes */}
            {detection.image_with_boxes_base64 && (
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted uppercase">Detected Regions</p>
                    <img
                        src={`data:image/png;base64,${detection.image_with_boxes_base64}`}
                        alt="Cells with boxes"
                        className="w-full rounded-lg border border-[var(--color-border)]"
                    />
                </div>
            )}

            {/* Cell Selection Gallery */}
            <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm font-semibold">Select Cell for Analysis</p>
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                    {cells.map((cell, idx) => (
                        <motion.button
                            key={cell.cell_id}
                            onClick={() => setSelectedCell(idx)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${selectedCell === idx
                                ? "border-blue-500 ring-2 ring-blue-500/30"
                                : "border-[var(--color-border)] hover:border-blue-500/50"
                                }`}
                        >
                            <img
                                src={`data:image/png;base64,${cell.cell_image_base64}`}
                                alt={`Cell ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold">
                                #{idx + 1}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Selected Cell Details */}
            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        key={selected.cell_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 pt-4 border-t border-[var(--color-border)]"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">Cell #{selectedCell + 1} Details</h4>
                            <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                <p className="text-xs font-semibold text-green-400">
                                    {(selected.confidence * 100).toFixed(1)}% Confidence
                                </p>
                            </div>
                        </div>

                        {/* Confidence Visualizer */}
                        <div className="space-y-2">
                            <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${selected.confidence * 100}%` }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Bounding Box Info */}
                        <div className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                            <div>
                                <p className="text-xs text-muted">X</p>
                                <p className="text-sm font-mono font-bold">{selected.bounding_box.x}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted">Y</p>
                                <p className="text-sm font-mono font-bold">{selected.bounding_box.y}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted">Width</p>
                                <p className="text-sm font-mono font-bold">{selected.bounding_box.width}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted">Height</p>
                                <p className="text-sm font-mono font-bold">{selected.bounding_box.height}</p>
                            </div>
                        </div>

                        {/* Cell Crop */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted">Cell Crop</p>
                            <img
                                src={`data:image/png;base64,${selected.cell_image_base64}`}
                                alt={`Cell ${selectedCell + 1}`}
                                className="w-full max-w-xs rounded-lg border border-[var(--color-border)]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--color-border)] text-center">
                <div>
                    <p className="text-2xl font-bold text-blue-500">{totalCells}</p>
                    <p className="text-xs text-muted">Total Cells</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-green-500">
                        {(cells.reduce((acc, c) => acc + c.confidence, 0) / totalCells * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted">Avg Confidence</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-purple-500">
                        {Math.max(...cells.map(c => c.confidence * 100)).toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted">Max Confidence</p>
                </div>
            </div>
        </motion.div>
    );
}
