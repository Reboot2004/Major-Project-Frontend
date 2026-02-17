"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
    originalImageBase64: string;
    normalizedImageBase64: string;
    method?: string;
}

export default function StainNormalizationViewer({ originalImageBase64, normalizedImageBase64, method }: Props) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const sliderContainerRef = useRef<HTMLDivElement | null>(null);

    const clamp = (value: number) => Math.max(0, Math.min(100, value));
    const moveSliderBy = (delta: number) => setSliderPosition((prev) => clamp(prev + delta));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-4"
        >
            <div>
                <h3 className="text-xl font-bold">Stain Normalization</h3>
                <p className="text-sm text-muted mt-1">Drag to compare original vs. normalized image</p>
                {method && <p className="text-xs text-muted mt-1">Method: {method}</p>}
                <p className="text-xs text-muted mt-1" title="Adaptive normalization reduces scanner/stain variance while preserving cellular morphology.">
                    Why this changed: better cross-dataset stain consistency from a single input image.
                </p>
            </div>

            {/* Comparison Slider (constrained size) */}
            <div
                ref={sliderContainerRef}
                className="relative w-full max-w-[520px] mx-auto overflow-hidden rounded-lg border border-[var(--color-border)] aspect-square bg-[var(--color-bg)]"
                tabIndex={0}
                role="slider"
                aria-label="Stain normalization comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPosition)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        moveSliderBy(-2);
                    }
                    if (e.key === "ArrowRight") {
                        e.preventDefault();
                        moveSliderBy(2);
                    }
                    if (e.key.toLowerCase() === "r") {
                        e.preventDefault();
                        setSliderPosition(50);
                    }
                }}
            >
                {/* Normalized Image (Background) */}
                <img
                    src={`data:image/png;base64,${normalizedImageBase64}`}
                    alt="Normalized"
                    className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Original Image (Foreground with clipping) */}
                <div
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={`data:image/png;base64,${originalImageBase64}`}
                        alt="Original"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Slider Handle */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDrag={(_, info) => {
                        const container = sliderContainerRef.current;
                        if (container) {
                            const rect = container.getBoundingClientRect();
                            const newPosition = ((info.point.x - rect.left) / Math.max(1, rect.width)) * 100;
                            setSliderPosition(clamp(newPosition));
                        }
                    }}
                    style={{ left: `${sliderPosition}%` }}
                    className="absolute top-0 bottom-0 w-1 bg-[hsl(350,65%,86%)] cursor-col-resize z-10 transform -translate-x-1/2"
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[hsl(350,65%,86%)] rounded-full p-2 shadow-lg">
                        <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <svg className="w-4 h-4 text-gray-800 -ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>

                {/* Labels */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--color-bg-elevated)]/80 text-[var(--color-fg)] text-xs font-semibold border border-[var(--color-border)]">
                    Original
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--color-bg-elevated)]/80 text-[var(--color-fg)] text-xs font-semibold border border-[var(--color-border)]">
                    Normalized
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xs text-muted">Keyboard: ← / → to move, R to reset</p>
                <button
                    type="button"
                    onClick={() => setSliderPosition(50)}
                    className="px-3 py-1.5 rounded-md border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-bg-alt)]"
                >
                    Reset Slider
                </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--color-border)]">
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted">Benefits:</p>
                    <ul className="text-xs text-muted space-y-1">
                        <li>Reduces stain variation</li>
                        <li>Improves consistency</li>
                    </ul>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted">Impact:</p>
                    <ul className="text-xs text-muted space-y-1">
                        <li>Better classification</li>
                        <li>Enhanced accuracy</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
