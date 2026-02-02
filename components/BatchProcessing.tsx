"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BatchJob, PredictResponse } from "@/lib/api";

interface Props {
    onSubmit?: (files: File[]) => Promise<BatchJob>;
    onStatusChange?: (status: BatchJob) => void;
}

export default function BatchProcessing({ onSubmit, onStatusChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [batchJob, setBatchJob] = useState<BatchJob | null>(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const newFiles = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!onSubmit || files.length === 0) return;
        setLoading(true);
        try {
            const job = await onSubmit(files);
            setBatchJob(job);
            onStatusChange?.(job);
            setFiles([]);
        } catch (error) {
            console.error("Batch submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-6"
        >
            <div>
                <h3 className="text-xl font-bold">Batch Processing</h3>
                <p className="text-sm text-muted mt-1">Process multiple images at once</p>
            </div>

            {!batchJob ? (
                <div className="space-y-4">
                    {/* Upload Area */}
                    <motion.div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        whileHover={{ scale: 1.01 }}
                        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${dragActive ? "border-blue-500 bg-blue-500/5" : "border-[var(--color-border)] hover:border-blue-500/50"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="space-y-2">
                            <svg className="w-12 h-12 mx-auto text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div>
                                <p className="text-sm font-semibold">Drag & drop images here</p>
                                <p className="text-xs text-muted">or click to select files</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">{files.length} file(s) selected</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFiles([])}
                                    className="text-xs px-2 py-1 rounded text-amber-400 hover:bg-amber-500/10"
                                >
                                    Clear All
                                </motion.button>
                            </div>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {files.map((file, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                            </svg>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium truncate">{file.name}</p>
                                                <p className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeFile(idx)}
                                            className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={files.length === 0 || loading}
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${files.length === 0 || loading
                            ? "bg-[var(--color-border)] text-muted cursor-not-allowed opacity-50"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                            }`}
                    >
                        {loading ? "Processing..." : `Process ${files.length} Image(s)`}
                    </motion.button>
                </div>
            ) : (
                <BatchJobStatus job={batchJob} />
            )}
        </motion.div>
    );
}

function BatchJobStatus({ job }: { job: BatchJob }) {
    const progress = (job.processed_files / job.total_files) * 100;
    const isComplete = job.status === "completed" || job.status === "failed";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold">Job ID: {job.job_id}</p>
                    <p className={`text-xs ${job.status === "failed" ? "text-red-400" : "text-green-400"} capitalize`}>
                        {job.status}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{job.processed_files}/{job.total_files}</p>
                    <p className="text-xs text-muted">Processed</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full bg-gradient-to-r ${job.status === "failed"
                            ? "from-red-500 to-rose-500"
                            : "from-green-500 to-emerald-500"
                            }`}
                    />
                </div>
                <p className="text-xs text-muted">{progress.toFixed(0)}% complete</p>
            </div>

            {/* Results Summary */}
            {job.results.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                    <p className="text-sm font-semibold">Results Summary</p>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                        {job.results.map((result, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs text-muted truncate">Image {idx + 1}</span>
                                </div>
                                <span className="text-xs font-semibold text-blue-400">{result.predicted_class}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Completion Message */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${job.status === "completed"
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                        }`}
                >
                    <p className={`text-sm font-semibold ${job.status === "completed" ? "text-green-400" : "text-red-400"}`}>
                        {job.status === "completed" ? "Batch Processing Complete" : "Batch Processing Failed"}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
