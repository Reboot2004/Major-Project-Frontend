"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classifyAndSegment } from "@/lib/api";
import Skeleton from "@/components/Skeleton";
import { useToast } from "@/components/ToastStore";

export default function ImageUploader({ onResult }: { onResult: (file: File, response: any) => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const { push } = useToast();

    const base64ToFile = (base64: string, filename: string) => {
        const byteString = atob(base64);
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        return new File([byteArray], filename, { type: "image/png" });
    };

    const onSelect = async (file: File) => {
        setError(null);
        setLoading(true);
        setProgress(0);

        // Simulate progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random() * 15, 90));
        }, 150);

        try {
            // Core classification/segmentation using the original image
            const res = await classifyAndSegment(file);

            setProgress(100);
            setTimeout(() => {
                onResult(file, res);
                push({ message: "Analysis complete.", type: "success" });
            }, 300);
        } catch (e: any) {
            const msg = e?.message ?? "Prediction failed";
            setError(msg);
            push({ message: msg, type: "error" });
        } finally {
            clearInterval(progressInterval);
            setTimeout(() => setLoading(false), 400);
        }
    };

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <motion.div
                className={`relative card border-dashed border-2 cursor-pointer overflow-hidden transition-all duration-500 ${dragOver
                    ? "border-accent scale-[1.02] shadow-[0_0_40px_hsl(var(--theme-hue),70%,55%,0.4)]"
                    : "hover:border-accent/50 hover:shadow-[0_0_20px_hsl(var(--theme-hue),70%,55%,0.2)]"
                    }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) onSelect(file);
                }}
                onClick={() => !loading && inputRef.current?.click()}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                aria-label="Image upload drop zone"
                role="button"
                tabIndex={0}
            >
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    animate={{
                        opacity: dragOver ? 0.1 : 0,
                        background: [
                            'radial-gradient(circle at 20% 50%, hsl(var(--theme-hue), 70%, 50%), transparent)',
                            'radial-gradient(circle at 80% 50%, hsl(var(--theme-hue), 70%, 50%), transparent)',
                            'radial-gradient(circle at 20% 50%, hsl(var(--theme-hue), 70%, 50%), transparent)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative flex flex-col items-center gap-5 text-center py-8">
                    {/* Upload Icon */}
                    <motion.div
                        className="relative"
                        animate={{
                            y: dragOver ? -8 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.div
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center backdrop-blur-sm"
                            whileHover={{ rotate: 5, scale: 1.05 }}
                        >
                            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </motion.div>
                        {dragOver && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 border-accent"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 1.3, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.div>

                    <div className="space-y-2">
                        <motion.p
                            className="text-base font-medium"
                            animate={{ opacity: dragOver ? 1 : 0.7 }}
                        >
                            {dragOver ? "Drop your image here" : "Drag and drop your cervical cell image"}
                        </motion.p>
                        <p className="text-sm text-muted">or click to browse files</p>
                        <p className="text-xs text-muted">Supports: JPG, PNG, TIFF • Max 10MB</p>
                    </div>

                    {!loading && (
                        <motion.button
                            className="btn mt-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                inputRef.current?.click();
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Choose Image
                        </motion.button>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) onSelect(f);
                        }}
                        aria-hidden="true"
                    />
                </div>

                {/* Loading State */}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[var(--color-bg-alt)]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                        >
                            <motion.div
                                className="relative w-16 h-16"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-accent/20" />
                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent" />
                            </motion.div>
                            <div className="space-y-3 w-full max-w-xs px-8">
                                <motion.p
                                    className="text-sm font-medium text-center"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Analyzing image with AI models...
                                </motion.p>
                                <div className="relative h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent to-accent/50 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.div
                                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ["-100%", "400%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                                <p className="text-xs text-muted text-center">
                                    Processing: {Math.round(progress)}%
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
