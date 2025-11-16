"use client";
import { motion } from "framer-motion";

export default function XaiPage() {
    return (
        <div className="space-y-10">
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
                    Transparency and trust are paramount in medical AI. Our explainability methods reveal exactly how the system makes decisions, empowering clinicians to validate and understand AI recommendations.
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
                        Score-weighted Class Activation Mapping generates high-resolution heatmaps by evaluating the importance of each activation map using forward passes. This gradient-free approach provides cleaner, more interpretable visualizations.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Benefits:</h4>
                        <ul className="space-y-1 text-sm text-muted">
                            <li>• Gradient-free, more stable visualizations</li>
                            <li>• Highlights discriminative cellular features</li>
                            <li>• High spatial resolution heatmaps</li>
                            <li>• Works across all convolutional layers</li>
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
                        Layer-wise Class Activation Mapping provides layer-specific visualizations, showing how different network depths focus on various cellular structures. This hierarchical view reveals the model's decision-making process step by step.
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
                    {[
                        {
                            title: "Clinical Trust",
                            desc: "Pathologists can verify AI reasoning aligns with medical knowledge, building confidence in automated analysis",
                            icon: "🔒"
                        },
                        {
                            title: "Error Detection",
                            desc: "Visual heatmaps reveal when AI focuses on artifacts or irrelevant regions, enabling quality control",
                            icon: "🔍"
                        },
                        {
                            title: "Educational Value",
                            desc: "Trainees can learn which cellular features are diagnostically important by studying AI attention patterns",
                            icon: "📚"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="card text-center space-y-3"
                        >
                            <div className="text-4xl">{item.icon}</div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="card bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20 space-y-4">
                <h2 className="text-2xl font-bold">Integration with Segmentation</h2>
                <p className="text-muted leading-relaxed">
                    By overlaying XAI heatmaps with U-Net segmentation masks, we create a comprehensive visualization that shows not only where the AI is looking, but also which anatomical structures it's focusing on. This dual-layer transparency is unprecedented in cervical cancer screening tools.
                </p>
            </section>
        </div>
    );
}
