"use client";

import { useRef, useState } from "react";
import { classifyAndSegment } from "@/lib/api";
import Skeleton from "@/components/Skeleton";
import { useToast } from "@/components/ToastStore";

export default function ImageUploader({ onResult }: { onResult: (file: File, response: any) => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { push } = useToast();

    const onSelect = async (file: File) => {
        setError(null);
        setLoading(true);
        try {
            const res = await classifyAndSegment(file);
            onResult(file, res);
            push({ message: "Inference complete", type: "success" });
        } catch (e: any) {
            const msg = e?.message ?? "Prediction failed";
            setError(msg);
            push({ message: msg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <div
                className={`card border-dashed transition-all duration-300 ${dragOver ? "border-accent scale-105 shadow-[0_0_20px_hsl(var(--theme-hue),70%,55%,0.3)]" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) onSelect(file);
                }}
                aria-label="Image upload drop zone"
                role="group"
            >
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-sm text-muted">Drag and drop an image here</div>
                    <div className="text-xs text-muted">or</div>
                    <button className="btn" onClick={() => inputRef.current?.click()} disabled={loading} aria-busy={loading}>
                        {loading ? "Analyzing" : "Choose Image"}
                    </button>
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
                    {loading && (
                        <div className="w-full mt-4 space-y-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                    )}
                </div>
            </div>
            {error && <div className="text-sm" style={{ color: "var(--color-danger)" }}>{error}</div>}
        </div>
    );
}
