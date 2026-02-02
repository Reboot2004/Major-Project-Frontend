"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploader from "@/components/ImageUploader";
import ClassificationResult from "@/components/ClassificationResult";
import UncertaintyDisplay from "@/components/UncertaintyMetrics";
import ClinicalDecisionSupport from "@/components/ClinicalDecisionSupport";
import AdvancedXAIVisualization from "@/components/AdvancedXAIVisualization";
import BatchProcessing from "@/components/BatchProcessing";
import ReportExport from "@/components/ReportExport";
import AdvancedToolsPanel from "@/components/AdvancedToolsPanel";
import type { PredictResponse, BatchJob } from "@/lib/api";
import { submitBatch } from "@/lib/api";

export default function DemoPage() {
    const [preview, setPreview] = useState<string | undefined>(undefined);
    const [result, setResult] = useState<PredictResponse | null>(null);
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<"overview" | "advanced" | "batch">("overview");

    const onResult = (file: File, res: PredictResponse) => {
        // Use original_image_base64 from backend if available, otherwise use file blob
        const imageToUse = res.original_image_base64
            ? `data:image/png;base64,${res.original_image_base64}`
            : URL.createObjectURL(file);
        setPreview(imageToUse);
        setResult(res);
        setImageFile(file);
    };

    const handleBatchSubmit = async (files: File[]): Promise<BatchJob> => {
        return await submitBatch(files);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-sm font-semibold text-accent">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI-Powered Diagnostics
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                    Interactive Demo
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted leading-relaxed max-w-3xl"
                >
                    Experience HerHealth.AI's diagnostic capabilities. Upload a cervical cell microscopy image to receive <span className="text-accent font-medium">classification</span>, <span className="text-accent font-medium">segmentation overlays</span>, <span className="text-accent font-medium">confidence and uncertainty</span>, and <span className="text-accent font-medium">explainability analysis</span> in seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 backdrop-blur-sm"
                >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        <strong>Note:</strong> This is a demonstration system. Clinical decisions should involve professional medical review.
                    </span>
                </motion.div>
            </div>

            {/* Tab Selection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-2 border-b border-[var(--color-border)]"
            >
                {[
                    {
                        id: "overview",
                        label: "Single Image",
                        icon: (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18v14H3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13l2-2 4 4 4-5" />
                            </svg>
                        )
                    },
                    {
                        id: "advanced",
                        label: "Advanced Analysis",
                        icon: (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        )
                    },
                    {
                        id: "batch",
                        label: "Batch Processing",
                        icon: (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )
                    }
                ].map((tab) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 -mb-[2px] ${activeTab === tab.id
                            ? "border-accent text-accent"
                            : "border-transparent text-muted hover:text-[var(--color-fg)]"
                            }`}
                    >
                        <span className="text-accent">{tab.icon}</span>
                        <span className="ml-2">{tab.label}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {/* Single Image Tab */}
                {activeTab === "overview" && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Uploader Section */}
                        <ImageUploader onResult={onResult} />

                        {/* Results Section */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                {/* Success Banner */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </motion.div>
                                    <div>
                                        <p className="font-semibold text-green-400">Analysis Complete</p>
                                        <p className="text-xs text-muted">
                                            AI models have successfully processed your image in {result.processing_time_ms}ms
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Primary Results */}
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <ClassificationResult result={result} originalImage={preview} />
                                    {preview && (result.xai_scorecam_base64 || result.xai_layercam_base64) && (
                                        <AdvancedXAIVisualization
                                            originalImageBase64={preview.split(",")[1] || preview}
                                            scoreCAMBase64={result.xai_scorecam_base64}
                                            layerCAMBase64={result.xai_layercam_base64}
                                        />
                                    )}
                                </div>

                                {/* Uncertainty Metrics */}
                                {result.uncertainty && (
                                    <UncertaintyDisplay uncertainty={result.uncertainty} />
                                )}


                                {/* Clinical Decision Support */}
                                {result.clinical_decision && (
                                    <ClinicalDecisionSupport
                                        decision={result.clinical_decision}
                                        confidence={result.uncertainty?.confidence}
                                    />
                                )}

                                {/* Report Export (Classification Only) */}
                                <ReportExport result={result} imageFile={imageFile} />

                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!result && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center py-12 space-y-4"
                            >
                                <div className="text-6xl opacity-20">...</div>
                                <p className="text-muted text-sm">Upload an image to see AI-powered analysis results</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Advanced Analysis Tab */}
                {activeTab === "advanced" && (
                    <motion.div
                        key="advanced"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        <div className="p-6 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-blue-400">Advanced Analysis Tools</p>
                                    <p className="text-sm text-muted mt-1">
                                        For advanced users: Fine-grained control over quality assessment, stain normalization,
                                        and multi-cell detection with downloadable outputs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Standalone Tools Panel */}
                        <AdvancedToolsPanel />

                        {/* Divider */}
                        {result && (
                            <div className="flex items-center gap-4 py-4">
                                <div className="flex-1 h-px bg-[var(--color-border)]" />
                                <p className="text-sm text-muted font-semibold">Full Analysis Results</p>
                                <div className="flex-1 h-px bg-[var(--color-border)]" />
                            </div>
                        )}

                        {/* Full Analysis Results from Main Upload */}
                        {result && preview ? (
                            <div className="space-y-6">
                                {/* Clinical Decision Support - Show First */}
                                {result.clinical_decision && (
                                    <ClinicalDecisionSupport
                                        decision={result.clinical_decision}
                                        confidence={result.uncertainty?.confidence}
                                    />
                                )}

                                {/* Uncertainty Metrics */}
                                {result.uncertainty && (
                                    <UncertaintyDisplay uncertainty={result.uncertainty} />
                                )}

                                {/* Advanced XAI Visualization */}
                                {preview && (result.xai_scorecam_base64 || result.xai_layercam_base64) && (
                                    <AdvancedXAIVisualization
                                        originalImageBase64={preview.split(",")[1] || preview}
                                        scoreCAMBase64={result.xai_scorecam_base64}
                                        layerCAMBase64={result.xai_layercam_base64}
                                    />
                                )}

                            </div>
                        ) : result && !preview ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="text-6xl opacity-20">...</div>
                                <p className="text-muted">Advanced analysis requires image preview</p>
                            </div>
                        ) : null}
                    </motion.div>
                )}

                {/* Batch Processing Tab */}
                {activeTab === "batch" && (
                    <motion.div
                        key="batch"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <BatchProcessing onSubmit={handleBatchSubmit} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
