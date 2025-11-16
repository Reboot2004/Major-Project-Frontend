"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="space-y-12">
            <section className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    About HerHealth.AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted max-w-3xl"
                >
                    Transforming cervical cancer screening through artificial intelligence, making early detection accessible to every woman worldwide.
                </motion.p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card space-y-4"
                >
                    <div className="text-4xl">🎯</div>
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-muted leading-relaxed">
                        To democratize access to advanced cervical cancer screening by leveraging state-of-the-art AI technology. We believe every woman deserves accurate, timely, and explainable diagnostic tools—regardless of geographic or economic barriers.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card space-y-4"
                >
                    <div className="text-4xl">🔮</div>
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                    <p className="text-muted leading-relaxed">
                        A future where cervical cancer is detected at the earliest stages through AI-powered screening, dramatically reducing mortality rates and improving women's health outcomes globally. We envision AI as a trusted partner in medical diagnosis.
                    </p>
                </motion.div>
            </section>

            <section className="space-y-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-center"
                >
                    How It Works
                </motion.h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        { step: "01", title: "Image Upload", desc: "Medical professional uploads cervical cell microscopy image" },
                        { step: "02", title: "AI Analysis", desc: "ConvNeXt classifier and U-Net segmenter process the image" },
                        { step: "03", title: "Results Generation", desc: "System generates classification, segmentation masks, and explainability heatmaps" },
                        { step: "04", title: "Clinical Review", desc: "Healthcare provider reviews AI insights alongside traditional methods" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="card space-y-3 text-center"
                        >
                            <div className="text-3xl font-bold text-[var(--color-accent)]">{item.step}</div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-2xl md:text-3xl font-bold text-center"
                >
                    Impact Timeline
                </motion.h2>
                <div className="space-y-4 max-w-3xl mx-auto">
                    {[
                        { year: "2024", title: "Research & Development", desc: "Developed hybrid ConvNeXt + U-Net architecture with explainable AI integration" },
                        { year: "2025", title: "Clinical Validation", desc: "Achieved 98.5% F1 score on SIPaKMeD dataset; initiated clinical validation studies" },
                        { year: "2026", title: "Pilot Programs", desc: "Deploying in underserved communities to validate real-world effectiveness" },
                        { year: "2027+", title: "Global Scale", desc: "Expanding access to millions of women through partnerships with healthcare providers" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + i * 0.1 }}
                            className="card flex gap-6 items-start"
                        >
                            <div className="text-2xl font-bold text-[var(--color-accent)] min-w-[80px]">{item.year}</div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-sm text-muted">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="card space-y-4 bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20">
                <h2 className="text-2xl font-bold">Why This Matters</h2>
                <div className="space-y-3 text-muted">
                    <p className="leading-relaxed">
                        Cervical cancer is the fourth most common cancer among women globally, with over 600,000 new cases annually. Early detection through screening can prevent up to 80% of cases, yet millions lack access to quality diagnostic services.
                    </p>
                    <p className="leading-relaxed">
                        HerHealth.AI addresses this gap by providing medical-grade analysis that can be deployed in resource-limited settings, empowering healthcare workers with advanced tools and ultimately saving lives.
                    </p>
                </div>
            </section>

            <section className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Technology Stack</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                    {["ConvNeXt", "Attention U-Net", "Score-CAM", "Layer-CAM", "PyTorch", "FastAPI", "Next.js 14", "TailwindCSS"].map((tech) => (
                        <span key={tech} className="px-4 py-2 rounded-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-sm font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
}
