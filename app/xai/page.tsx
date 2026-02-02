"use client";
import { motion } from "framer-motion";

export default function XaiPage() {
    return (
        <div className="space-y-12">
            <section className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Explainable AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted max-w-3xl"
                >
                    Transparency and trust are paramount in medical AI. Our explainability methods reveal how the system makes decisions, enabling clinicians to validate AI recommendations.
                </motion.p>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card space-y-4"
                >
                    <h2 className="text-2xl font-bold">Score-CAM</h2>
                    <p className="text-muted leading-relaxed">
                        Score-weighted Class Activation Mapping generates heatmaps by evaluating activation importance using forward passes. This gradient-free approach provides clearer visualizations.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Benefits:</h4>
                        <ul className="space-y-1 text-sm text-muted">
                            <li>• Gradient-free, stable visualizations</li>
                            <li>• Highlights discriminative cellular features</li>
                            <li>• High spatial resolution heatmaps</li>
                            <li>• Works across convolutional layers</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card space-y-4"
                >
                    <h2 className="text-2xl font-bold">Layer-CAM</h2>
                    <p className="text-muted leading-relaxed">
                        Layer-wise Class Activation Mapping provides layer-specific visualizations, revealing how different network depths focus on cellular structures.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Benefits:</h4>
                        <ul className="space-y-1 text-sm text-muted">
                            <li>• Layer-specific attention visualization</li>
                            <li>• Shows hierarchical feature learning</li>
                            <li>• Class-discriminative localization</li>
                            <li>• Validates model reasoning pathways</li>
                        </ul>
                    </div>
                </motion.div>
            </section>

            <section className="space-y-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-center"
                >
                    Why Explainability Matters
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[{
                        title: "Clinical Trust",
                        desc: "Pathologists can verify AI reasoning aligns with medical knowledge and build confidence in automated analysis",
                        icon: (
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
                            </svg>
                        )
                    },
                    {
                        title: "Error Detection",
                        desc: "Heatmaps reveal when models focus on artifacts or irrelevant regions, enabling quality control",
                        icon: (
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )
                    },
                    {
                        title: "Educational Value",
                        desc: "Trainees can learn diagnostically important features by studying AI attention patterns",
                        icon: (
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16" />
                            </svg>
                        )
                    }].map((item) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card text-center space-y-3"
                        >
                            <div className="text-[var(--color-accent)]">{item.icon}</div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="card bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20 space-y-4">
                <h2 className="text-2xl font-bold">Integration with Segmentation</h2>
                <p className="text-muted leading-relaxed">
                    By overlaying XAI heatmaps with segmentation masks, we visualize where the AI focuses and which anatomical structures inform decisions.
                </p>
            </section>
        </div>
    );
}
