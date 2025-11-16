"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <div className="space-y-16">
            <section className="text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-sm font-medium text-[var(--color-accent)] mb-4"
                >
                    Advancing Women's Health Through AI
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                >
                    Early Detection Saves Lives
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed"
                >
                    HerHealth.AI combines cutting-edge deep learning with medical expertise to provide accurate, explainable cervical cancer screening. Our mission is to make advanced diagnostic tools accessible to every woman.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Link href="/demo" className="btn">Experience the Technology</Link>
                    <Link href="/about" className="btn-secondary">Our Mission</Link>
                </motion.div>
            </section>

            <section className="space-y-8">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl md:text-3xl font-bold text-center"
                >
                    Why HerHealth.AI?
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "98.5% Accuracy", desc: "State-of-the-art deep learning models trained on extensive datasets", icon: "🎯" },
                        { title: "Explainable Results", desc: "Transparent AI decisions with visual heatmaps showing areas of concern", icon: "🔍" },
                        { title: "Fast Analysis", desc: "Results in seconds, enabling rapid screening and diagnosis", icon: "⚡" },
                        { title: "Accessible Care", desc: "Bringing advanced diagnostics to underserved communities", icon: "🌍" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="card text-center space-y-3"
                        >
                            <div className="text-4xl">{item.icon}</div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Advanced Classification", desc: "ConvNeXt architecture identifies 5 distinct cervical cell types with medical-grade precision", tech: "ConvNeXt" },
                    { title: "Precise Segmentation", desc: "Attention U-Net isolates cellular regions for detailed morphological analysis", tech: "U-Net + Attention" },
                    { title: "Transparent AI", desc: "Score-CAM and Layer-CAM visualizations reveal exactly what the AI sees", tech: "Explainable AI" }
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -4 }}
                        className="card space-y-3"
                    >
                        <div className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide">{item.tech}</div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
