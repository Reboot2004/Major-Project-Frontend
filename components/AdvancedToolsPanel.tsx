"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    assessQuality,
    normalizStain,
    detectMultipleCells,
    type QualityAssessment,
    type MultiCellDetectionResult,
} from "@/lib/api";
import QualityAssessmentComponent from "./QualityAssessment";
import StainNormalizationViewer from "./StainNormalization";
import MultiCellDetection from "./MultiCellDetection";

type ToolType = "quality" | "stain" | "multicell";

export default function AdvancedToolsPanel() {
    const [activeTool, setActiveTool] = useState<ToolType | null>(null);
    const [loading, setLoading] = useState(false);
    const [qualityResult, setQualityResult] = useState<QualityAssessment | null>(null);
    const [stainResult, setStainResult] = useState<{
        original: string;
        normalized: string;
        method?: string;
        strategy?: {
            background_white_balance?: boolean;
            foreground_lab_normalization?: boolean;
            adaptive_blend?: boolean;
        };
    } | null>(null);
    const [multiCellResult, setMultiCellResult] = useState<MultiCellDetectionResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [stainSource, setStainSource] = useState<File | null>(null);
    const [stainStatus, setStainStatus] = useState<{
        type: "idle" | "processing" | "success" | "error";
        message: string;
    }>({ type: "idle", message: "" });

    const readFileAsBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result?.toString().split(",")[1] || "";
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const runStainNormalization = async (source: File) => {
        setStainStatus({ type: "processing", message: "Running adaptive stain normalization..." });
        setLoading(true);
        try {
            const originalBase64 = await readFileAsBase64(source);
            const normalized = await normalizStain(source);
            setStainResult({
                original: originalBase64,
                normalized: normalized.normalized_image_base64,
                method: normalized.stain_normalization_method,
                strategy: normalized.normalization_strategy,
            });
            setStainStatus({
                type: "success",
                message: `Normalization complete${normalized.stain_normalization_method ? ` (${normalized.stain_normalization_method})` : ""}.`,
            });
        } catch (error) {
            console.error("Stain normalization failed:", error);
            setStainStatus({ type: "error", message: "Normalization failed. Please try another image." });
        } finally {
            setLoading(false);
        }
    };

    const downloadJson = (filename: string, data: unknown) => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadBase64Image = (filename: string, base64: string) => {
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${base64}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const handleFileSelect = async (file: File, tool: ToolType) => {
        if (tool === "stain") {
            setStainSource(file);
            await runStainNormalization(file);
            return;
        }

        setLoading(true);
        try {
            if (tool === "quality") {
                const result = await assessQuality(file);
                setQualityResult(result);
            } else if (tool === "multicell") {
                const result = await detectMultipleCells(file);
                setMultiCellResult(result);
            }
        } catch (error) {
            console.error("Tool execution failed:", error);
            alert("Failed to process image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const tools = [
        {
            id: "quality" as ToolType,
            name: "Quality Assessment",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            description: "Analyze image quality and detect issues",
            color: "blue",
        },
        {
            id: "stain" as ToolType,
            name: "Stain Normalization",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
            ),
            description: "Normalize stain from the given image only (adaptive)",
            color: "purple",
        },
        {
            id: "multicell" as ToolType,
            name: "Multi-Cell Detection",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            description: "Detect and locate multiple cells",
            color: "green",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Tool Selection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card space-y-4"
            >
                <div>
                    <h3 className="text-xl font-bold">Standalone Analysis Tools</h3>
                    <p className="text-sm text-muted mt-1">
                        Run individual analysis tools independently
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tools.map((tool) => (
                        <motion.button
                            key={tool.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setActiveTool(tool.id);
                                fileInputRef.current?.click();
                            }}
                            disabled={loading}
                            className={`p-6 rounded-lg border-2 transition-all text-left ${activeTool === tool.id
                                ? `border-${tool.color}-500 bg-${tool.color}-500/10`
                                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                                } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            <div className="text-[var(--color-accent)] mb-3">{tool.icon}</div>
                            <h4 className="font-semibold text-base mb-1">{tool.name}</h4>
                            <p className="text-xs text-muted">{tool.description}</p>
                        </motion.button>
                    ))}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (!activeTool || files.length === 0) return;
                        handleFileSelect(files[0], activeTool);
                        e.target.value = "";
                    }}
                />
            </motion.div>

            {activeTool === "stain" && stainStatus.type === "processing" && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <p className="text-sm text-muted">Running adaptive stain normalization...</p>
                </motion.div>
            )}

            {/* Loading State */}
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card text-center py-8"
                >
                    <div className="flex items-center justify-center gap-3">
                        <svg
                            className="animate-spin w-6 h-6 text-[var(--color-accent)]"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <p className="text-sm font-semibold">Processing image...</p>
                    </div>
                </motion.div>
            )}

            {/* Results */}
            {qualityResult && activeTool === "quality" && (
                <div className="space-y-3">
                    <QualityAssessmentComponent quality={qualityResult} />
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => downloadJson("quality_report.json", qualityResult)}
                            className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg-alt)]"
                        >
                            Download Quality Report
                        </button>
                    </div>
                </div>
            )}

            {stainResult && activeTool === "stain" && (
                <div className="space-y-3">
                    <StainNormalizationViewer
                        originalImageBase64={stainResult.original}
                        normalizedImageBase64={stainResult.normalized}
                        method={stainResult.method}
                    />
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => downloadBase64Image("stain_normalized.png", stainResult.normalized)}
                            className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg-alt)]"
                        >
                            Download Normalized Image
                        </button>
                        <button
                            type="button"
                            onClick={() => downloadJson("stain_normalization.json", {
                                source_filename: stainSource?.name,
                                stain_normalization_method: stainResult.method,
                                normalization_strategy: stainResult.strategy,
                                generated_at: new Date().toISOString()
                            })}
                            className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg-alt)]"
                        >
                            Download Normalization Summary
                        </button>
                    </div>
                </div>
            )}

            {multiCellResult && activeTool === "multicell" && (
                <div className="space-y-3">
                    <MultiCellDetection detection={multiCellResult} />
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => downloadJson("multi_cell_results.json", multiCellResult)}
                            className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg-alt)]"
                        >
                            Download Detection Report
                        </button>
                        {multiCellResult.image_with_boxes_base64 && (
                            <button
                                type="button"
                                onClick={() => downloadBase64Image("multi_cell_boxes.png", multiCellResult.image_with_boxes_base64!)}
                                className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg-alt)]"
                            >
                                Download Overlay Image
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
