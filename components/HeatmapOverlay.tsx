"use client";
import { useRef, useEffect } from "react";
import { toDataUrl } from "@/lib/api";

interface Props {
    base64: string;
    backgroundImage?: string;
}

export default function HeatmapOverlay({ base64, backgroundImage }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heatmapUrl = toDataUrl(base64);

    useEffect(() => {
        if (!canvasRef.current || !backgroundImage) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bg = new Image();
        const heat = new Image();

        bg.onload = () => {
            canvas.width = bg.width;
            canvas.height = bg.height;
            ctx.drawImage(bg, 0, 0);

            heat.onload = () => {
                ctx.globalAlpha = 0.85;
                ctx.drawImage(heat, 0, 0, canvas.width, canvas.height);
            };
            heat.src = heatmapUrl!;
        };
        bg.src = backgroundImage;
    }, [backgroundImage, heatmapUrl]);

    if (!backgroundImage) {
        return (
            <div className="border rounded-md overflow-hidden border-[var(--color-border)]" aria-label="XAI Heatmap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heatmapUrl} alt="heatmap" className="w-full block" />
            </div>
        );
    }

    return (
        <div className="border rounded-md overflow-hidden border-[var(--color-border)]" aria-label="XAI Heatmap overlay">
            <canvas ref={canvasRef} className="w-full block" />
        </div>
    );
}