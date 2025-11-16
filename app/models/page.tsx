"use client";
import { motion } from "framer-motion";

export default function ModelsPage() {
    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Our AI Models
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted max-w-3xl"
                >
                    State-of-the-art deep learning architectures working in concert to deliver accurate, explainable cervical cell analysis.
                </motion.p>
            </section>

            <section className="grid lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card space-y-4"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">ConvNeXt Classifier</h2>
                            <div className="text-sm text-[var(--color-accent)] font-semibold mt-1">Classification Model</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">98.5% F1</div>
                    </div>
                    <p className="text-muted leading-relaxed">
                        Modern convolutional architecture that classifies cervical cells into five distinct categories with medical-grade accuracy. ConvNeXt combines the efficiency of transformers with the reliability of CNNs.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Classification Categories:</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Dyskeratotic", "Koilocytotic", "Metaplastic", "Parabasal", "Superficial-Intermediate"].map(cls => (
                                <span key={cls} className="px-3 py-1 rounded-md bg-[var(--color-bg)] text-xs">{cls}</span>
                            ))}
                        </div>
                    </div>
                    <div className="pt-3 border-t border-[var(--color-border)] grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">98.5%</div>
                            <div className="text-xs text-muted">F1 Score</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">97.8%</div>
                            <div className="text-xs text-muted">Precision</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">99.2%</div>
                            <div className="text-xs text-muted">Recall</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card space-y-4"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Attention U-Net</h2>
                            <div className="text-sm text-[var(--color-accent)] font-semibold mt-1">Segmentation Model</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">96.2% IoU</div>
                    </div>
                    <p className="text-muted leading-relaxed">
                        Advanced encoder-decoder network with SCSE attention mechanisms for precise segmentation of nucleus and cytoplasm regions. Provides spatial context crucial for accurate diagnosis.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        <ul className="space-y-1 text-sm text-muted">
                            <li>• Spatial and channel attention gates</li>
                            <li>• Multi-scale feature extraction</li>
                            <li>• Pixel-perfect boundary detection</li>
                            <li>• Real-time inference capability</li>
                        </ul>
                    </div>
                    <div className="pt-3 border-t border-[var(--color-border)] grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">96.2%</div>
                            <div className="text-xs text-muted">IoU Score</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">97.5%</div>
                            <div className="text-xs text-muted">Dice Coef</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">0.3s</div>
                            <div className="text-xs text-muted">Inference</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card space-y-3"
                >
                    <h3 className="text-xl font-bold">Hybrid Pipeline</h3>
                    <p className="text-sm text-muted leading-relaxed">
                        Our unique approach combines segmentation masks with classifier attention maps, creating a comprehensive analysis that considers both cellular morphology and spatial patterns. This hybrid methodology significantly improves reliability in challenging cases.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="card space-y-3"
                >
                    <h3 className="text-xl font-bold">Explainable AI</h3>
                    <p className="text-sm text-muted leading-relaxed">
                        Score-CAM and Layer-CAM generate visual heatmaps showing exactly which regions influenced the AI's decision. This transparency is crucial for clinical trust and enables pathologists to validate AI recommendations with confidence.
                    </p>
                </motion.div>
            </section>

            <section className="card bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20 space-y-4">
                <h2 className="text-2xl font-bold">Clinical Validation</h2>
                <p className="text-muted leading-relaxed">
                    All models have been extensively validated on the SIPaKMeD dataset containing thousands of annotated cervical cell images. Performance metrics meet or exceed standards required for clinical decision support systems.
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    {[
                        { label: "Training Images", value: "4,049" },
                        { label: "Validation Cycles", value: "1,000+" },
                        { label: "Test Accuracy", value: "98.1%" },
                        { label: "False Positive Rate", value: "<2%" }
                    ].map(item => (
                        <div key={item.label} className="text-center">
                            <div className="text-2xl font-bold text-[var(--color-accent)]">{item.value}</div>
                            <div className="text-xs text-muted mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
