"use client";
import { motion } from "framer-motion";

export default function DatasetPage() {
    const classes = [
        { name: "Dyskeratotic", desc: "Abnormal keratinization, pre-cancerous indicator", count: "813" },
        { name: "Koilocytotic", desc: "HPV-infected cells with characteristic halos", count: "825" },
        { name: "Metaplastic", desc: "Normal cellular transformation process", count: "793" },
        { name: "Parabasal", desc: "Immature cells from basal layer", count: "787" },
        { name: "Superficial-Intermediate", desc: "Normal mature surface cells", count: "831" }
    ];

    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Training Dataset
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted max-w-3xl"
                >
                    Our models are trained on the SIPaKMeD (Single Cell Images from Pap smears Knowledge-based Management Database), a comprehensive, expertly-annotated dataset of cervical cell images.
                </motion.p>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
                {[
                    { label: "Total Images", value: "4,049", desc: "High-resolution microscopy images" },
                    { label: "Cell Classes", value: "5", desc: "Clinically relevant categories" },
                    { label: "Expert Annotations", value: "100%", desc: "Validated by pathologists" }
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="card text-center space-y-2"
                    >
                        <div className="text-4xl font-bold text-[var(--color-accent)]">{item.value}</div>
                        <h3 className="font-semibold">{item.label}</h3>
                        <p className="text-xs text-muted">{item.desc}</p>
                    </motion.div>
                ))}
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Cell Classification Categories</h2>
                <div className="space-y-3">
                    {classes.map((cls, i) => (
                        <motion.div
                            key={cls.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="card flex items-start justify-between gap-4"
                        >
                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold text-lg">{cls.name}</h3>
                                <p className="text-sm text-muted">{cls.desc}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-[var(--color-accent)]">{cls.count}</div>
                                <div className="text-xs text-muted">samples</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="card bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20 space-y-4">
                <h2 className="text-2xl font-bold">Data Preprocessing Pipeline</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="font-semibold">Image Processing</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>• Standardized resizing to 224×224 pixels</li>
                            <li>• Color normalization across batches</li>
                            <li>• Contrast enhancement for cell clarity</li>
                            <li>• Background noise reduction</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold">Data Augmentation</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>• Random rotation and flipping</li>
                            <li>• Brightness and contrast variation</li>
                            <li>• Elastic deformation simulation</li>
                            <li>• Color jittering for robustness</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="card space-y-4">
                <h2 className="text-2xl font-bold">Dataset Source & Citation</h2>
                <p className="text-muted leading-relaxed">
                    The SIPaKMeD database was created at the Laboratory of Medical Image Processing (LMIP) at the University of Western Macedonia, Greece. All images were acquired through microscopy of Pap smear slides and annotated by expert cytopathologists.
                </p>
                <div className="p-4 bg-[var(--color-bg)] rounded-md border border-[var(--color-border)]">
                    <p className="text-xs text-muted font-mono">
                        Plissiti, M.E., Dimitrakopoulos, P., Sfikas, G., Nikou, C., Krikoni, O., & Charchanti, A. (2018).
                        <span className="block mt-1 italic">SIPaKMeD: A New Dataset for Feature and Image Based Classification of Normal and Pathological Cervical Cells in Pap Smear Images.</span>
                    </p>
                </div>
            </section>
        </div>
    );
}
