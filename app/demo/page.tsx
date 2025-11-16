"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploader from "@/components/ImageUploader";
import ClassificationResult from "@/components/ClassificationResult";
import SegmentationResult from "@/components/SegmentationResult";
import type { PredictResponse } from "@/lib/api";

export default function DemoPage() {
    const [preview, setPreview] = useState<string | undefined>(undefined);
    const [result, setResult] = useState<PredictResponse | null>(null);

    const onResult = (file: File, res: PredictResponse) => {
        setPreview(URL.createObjectURL(file));
        setResult(res);
    };

    return (
        <div className="space-y-6">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-semibold"
            >
                Interactive Demo
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted"
            >
                Experience HerHealth.AI's diagnostic capabilities. Upload a cervical cell microscopy image to receive classification, segmentation, and explainability analysis in seconds.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-block px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400"
            >
                Note: This is a demonstration system. Clinical decisions should involve professional medical review.
            </motion.div>
            <ImageUploader onResult={onResult} />
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <ClassificationResult result={result} originalImage={preview} />
                        <SegmentationResult result={result} original={preview} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
