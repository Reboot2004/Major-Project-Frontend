"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";

interface QualityMetrics {
    score?: number;
    flags?: {
        is_blurry?: boolean;
        low_contrast?: boolean;
        poor_color?: boolean;
        overexposed?: boolean;
        underexposed?: boolean;
        excessive_noise?: boolean;
        usable?: boolean;
    };
    metrics?: {
        laplacian_variance?: number;
        contrast_std?: number;
        brightness_mean?: number;
        saturation_mean?: number;
        noise_level?: number;
    };
    quality_score?: number;
    quality_level?: string;
    issues?: string[];
    recommendations?: string[];
}

interface Props {
    quality: QualityMetrics | undefined;
}

export default function QualityAssessmentComponent({ quality }: Props) {
    if (!quality) return null;

    const score = quality.score ?? (quality.quality_score !== undefined ? quality.quality_score / 100 : 0);
    const flags = quality.flags ?? {};
    const isUsable = flags.usable !== false;

    const getScoreColor = (score: number) => {
        if (score >= 0.75) return 'text-green-400';
        if (score >= 0.5) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 0.75) return 'bg-green-900/30 border-green-700';
        if (score >= 0.5) return 'bg-yellow-900/30 border-yellow-700';
        return 'bg-red-900/30 border-red-700';
    };

    const issues = quality.issues?.length
        ? quality.issues
        : (() => {
            const derived = [] as string[];
            if (flags.is_blurry) derived.push('Image appears blurry');
            if (flags.low_contrast) derived.push('Low contrast detected');
            if (flags.poor_color) derived.push('Color saturation issues');
            if (flags.overexposed) derived.push('Overexposed areas detected');
            if (flags.underexposed) derived.push('Underexposed areas detected');
            if (flags.excessive_noise) derived.push('Excessive noise detected');
            return derived;
        })();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card border-2 space-y-4 ${getScoreBg(score)}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        Image Quality Assessment
                    </h3>
                    <p className="text-sm text-muted mt-1">Automated quality evaluation</p>
                </div>
                <div className="text-right flex items-center gap-2">
                    {isUsable ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                        <div className={`text-3xl font-bold tabular-nums ${getScoreColor(score)}`}>
                            {(score * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality Score Bar */}
            <div className="space-y-2">
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full ${score >= 0.75 ? 'bg-green-500' :
                            score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                    />
                </div>
                <p className="text-xs text-muted">Quality Score</p>
            </div>

            {/* Quality Status */}
            <div className="p-3 bg-slate-800 rounded">
                <p className={`text-sm font-semibold ${isUsable ? 'text-green-400' : 'text-red-400'}`}>
                    {isUsable ? 'Image quality is acceptable for analysis' : 'Image quality may affect analysis accuracy'}
                </p>
            </div>

            {/* Issues (if any) */}
            {issues.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-700">
                    <p className="font-semibold text-sm text-amber-300">Detected Issues:</p>
                    {issues.map((issue, idx) => (
                        <div key={idx} className="text-xs text-amber-300 flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">•</span>
                            <span>{issue}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Metrics Details */}
            {quality.metrics && (
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-700">
                    {quality.metrics.laplacian_variance !== undefined && (
                        <div className="text-slate-400">
                            <span className="block text-slate-500">Blur Level</span>
                            <span className="text-slate-200 font-mono">{quality.metrics.laplacian_variance.toFixed(1)}</span>
                        </div>
                    )}
                    {quality.metrics.contrast_std !== undefined && (
                        <div className="text-slate-400">
                            <span className="block text-slate-500">Contrast</span>
                            <span className="text-slate-200 font-mono">{quality.metrics.contrast_std.toFixed(1)}</span>
                        </div>
                    )}
                    {quality.metrics.brightness_mean !== undefined && (
                        <div className="text-slate-400">
                            <span className="block text-slate-500">Brightness</span>
                            <span className="text-slate-200 font-mono">{quality.metrics.brightness_mean.toFixed(0)}</span>
                        </div>
                    )}
                    {quality.metrics.noise_level !== undefined && (
                        <div className="text-slate-400">
                            <span className="block text-slate-500">Noise Level</span>
                            <span className="text-slate-200 font-mono">{quality.metrics.noise_level.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Recommendation */}
            {!isUsable && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded text-xs text-red-300">
                    <p className="font-semibold mb-1">Recommendation:</p>
                    <p>Please capture a new image with better lighting and focus for improved analysis accuracy.</p>
                </div>
            )}
        </motion.div>
    );
}
