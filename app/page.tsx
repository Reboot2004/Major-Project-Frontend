"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
    const highlights = [
        {
            title: "98.5% Accuracy",
            desc: "State-of-the-art deep learning models trained on extensive datasets",
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-blue-500/20 to-blue-500/5",
            borderColor: "border-blue-500/30"
        },
        {
            title: "Explainable Results",
            desc: "Transparent AI decisions with visual heatmaps showing areas of concern",
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            color: "from-purple-500/20 to-purple-500/5",
            borderColor: "border-purple-500/30"
        },
        {
            title: "Fast Analysis",
            desc: "Results in seconds, enabling rapid screening and diagnosis",
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "from-yellow-500/20 to-yellow-500/5",
            borderColor: "border-yellow-500/30"
        },
        {
            title: "Accessible Care",
            desc: "Bringing advanced diagnostics to underserved communities",
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8m4-8a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
            ),
            color: "from-green-500/20 to-green-500/5",
            borderColor: "border-green-500/30"
        }
    ];

    const visuals = [
        {
            src: "/images/cell-micrograph.svg",
            title: "Microscopy Sample",
            desc: "Representative cervical cell microscopy patterns"
        },
        {
            src: "/images/model-pipeline.svg",
            title: "Model Pipeline",
            desc: "Classification, segmentation, and decision flow"
        },
        {
            src: "/images/xai-heatmap.svg",
            title: "Explainability Map",
            desc: "Activation regions that guide predictions"
        }
    ];

    const howToSteps = [
        {
            title: "Upload and process a sample",
            desc: "Open the Demo, upload a cervical cell slide (or use a sample image), and let the system run preprocessing plus analysis.",
            gif: "/images/Upload.gif"
        },
        {
            title: "Review AI predictions",
            desc: "See model outputs in one place – cell type classification, U-Net segmentation masks, and XAI heatmaps.",
            gif: "/images/Prediction.gif"
        },
        {
            title: "Export a detailed report",
            desc: "Generate and download a structured PDF report summarizing findings, uncertainty metrics, and clinical decision support.",
            gif: "/images/Report.gif"
        }
    ];

    const pillars = [
        {
            title: "Advanced Classification",
            desc: "ConvNeXt architecture identifies 5 distinct cervical cell types with medical-grade precision",
            tech: "ConvNeXt-Tiny",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "Precise Segmentation",
            desc: "Attention U-Net isolates cellular regions for detailed morphological analysis",
            tech: "U-Net + Attention",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            title: "Transparent AI",
            desc: "Score-CAM and Layer-CAM visualizations reveal exactly what the AI sees",
            tech: "Explainable AI",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            gradient: "from-orange-500/20 to-red-500/20"
        }
    ];

    return (
        <div className="space-y-16">
            <section className="text-center space-y-8 py-12 relative">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent)]/15 via-[var(--color-accent)]/8 to-transparent border border-[var(--color-border)] text-sm font-semibold text-[var(--color-accent)] backdrop-blur-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Advancing Women’s Health Through AI
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Early Cervical Screening with Explainable AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted max-w-3xl mx-auto"
                >
                    HerHealth delivers fast, transparent, and accurate screening insights with classification, segmentation, and XAI visuals tailored for clinical workflows.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-fg)] font-semibold shadow-lg hover:opacity-90 transition"
                    >
                        Try the Demo
                    </Link>
                    <Link
                        href="#how-to-use"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-fg)] font-semibold hover:bg-[var(--color-bg-alt)] transition"
                    >
                        User Manual
                    </Link>
                </motion.div>
            </section>

            <section id="how-to-use" className="py-10 scroll-mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-3 mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        How to <span className="text-[var(--color-accent)]">Use HerHealth</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto text-sm md:text-base">
                        A simple three-step flow to explore the demo and understand your results.
                    </p>
                </motion.div>

                <div className="space-y-5">
                    {howToSteps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.45 }}
                            className="card border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 overflow-hidden flex flex-col md:flex-row md:items-stretch"
                        >
                            <div className="relative overflow-hidden md:w-1/2">
                                <img
                                    src={step.gif}
                                    alt={step.title}
                                    className="w-full h-52 md:h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 px-4 py-4 flex gap-4 items-start">
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center text-xs font-semibold text-[var(--color-accent)]">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm md:text-base mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`card text-center space-y-4 bg-gradient-to-br ${item.color} border ${item.borderColor} relative overflow-hidden group`}
                        >
                            <motion.div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <motion.div
                                    className="text-[var(--color-accent)] mb-2 flex justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center space-y-3 mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Project <span className="text-[var(--color-accent)]">Visuals</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Representative visuals from microscopy, model flow, and explainability.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {visuals.map((item) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -6 }}
                            className="card space-y-4 border border-[var(--color-border)]"
                        >
                            <div className="rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                                <img src={item.src} alt={item.title} className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-sm text-muted">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center space-y-3 mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Powered by <span className="text-[var(--color-accent)]">State-of-the-Art</span> AI
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Three specialized neural networks working together for comprehensive analysis.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {pillars.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`card space-y-4 bg-gradient-to-br ${item.gradient} border border-[var(--color-border)] relative overflow-hidden group`}
                        >
                            <motion.div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)]">
                                        {item.icon}
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs font-semibold text-[var(--color-accent)]">
                                        {item.tech}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
