"use client";

import { motion } from "framer-motion";
import { toDataUrl, type PredictResponse } from "@/lib/api";
import SegmentationBlend from "@/components/SegmentationBlend";
import HeatmapOverlay from "@/components/HeatmapOverlay";

export default function SegmentationResult({ result, original }: { result: PredictResponse, original?: string }) {
    const maskUrl = toDataUrl(result.segmentation_mask_base64);
    const scorecamUrl = toDataUrl(result.xai_scorecam_base64);
    const layercamUrl = toDataUrl(result.xai_layercam_base64);

    return (
        <motion.div
            className="card space-y-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-labelledby="segmentation-heading"
        >
            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
                <motion.h3
                    id="segmentation-heading"
                    className="font-semibold text-xl mb-2 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Segmentation Analysis
                </motion.h3>
                <motion.p
                    className="text-sm text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Attention U-Net neural architecture for precise nucleus boundary detection
                </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {original && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="text-xs text-muted mb-3 font-semibold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            Original Image
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={original} alt="Original input" className="rounded-lg w-full border border-[var(--color-border)] shadow-lg transition-transform hover:scale-[1.02]" />
                    </motion.div>
                )}
                {maskUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="text-xs text-muted mb-3 font-semibold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            Predicted Mask
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={maskUrl} alt="Segmentation mask" className="rounded-lg w-full border border-[var(--color-border)] shadow-lg transition-transform hover:scale-[1.02]" />
                    </motion.div>
                )}
                {original && maskUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="text-xs text-muted mb-3 font-semibold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            Overlay Blend
                        </div>
                        <div className="rounded-lg overflow-hidden border border-[var(--color-border)] shadow-lg transition-transform hover:scale-[1.02]">
                            <SegmentationBlend original={original} mask={maskUrl} />
                        </div>
                    </motion.div>
                )}
            </div>

            {(scorecamUrl || layercamUrl) && original && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative pt-6 border-t border-[var(--color-border)]"
                >
                    <h4 className="text-sm font-semibold text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Attention Mechanism Visualization
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        {scorecamUrl && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-xs text-muted mb-2 font-medium">ScoreCAM Overlay</div>
                                <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] shadow-lg">
                                    <HeatmapOverlay base64={result.xai_scorecam_base64!} backgroundImage={original} />
                                </div>
                            </motion.div>
                        )}
                        {layercamUrl && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-xs text-muted mb-2 font-medium">LayerCAM Overlay</div>
                                <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] shadow-lg">
                                    <HeatmapOverlay base64={result.xai_layercam_base64!} backgroundImage={original} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <motion.p
                        className="text-xs text-muted mt-3 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        The attention heatmap reveals which cellular structures the U-Net focused on during segmentation, providing insight into the model's feature extraction process.
                    </motion.p>
                </motion.div>
            )}
        </motion.div>
    );
}
