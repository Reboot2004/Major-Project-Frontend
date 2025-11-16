"use client";
import { useState, useRef, useEffect } from "react";
import { toDataUrl } from "@/lib/api";

interface Props {
    base64: string;
    backgroundImage?: string;
}

export default function HeatmapOverlay({ base64, backgroundImage }: Props) {
    const [opacity, setOpacity] = useState(0.7);
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
                ctx.globalAlpha = opacity;
                ctx.drawImage(heat, 0, 0, canvas.width, canvas.height);
            };
            heat.src = heatmapUrl!;
        };
        bg.src = backgroundImage;
    }, [backgroundImage, heatmapUrl, opacity]);

    if (!backgroundImage) {
        return (
            <div className="space-y-3" aria-label="XAI Heatmap">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-muted">Heatmap opacity</div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        aria-label="Heatmap opacity"
                        className="w-24"
                    />
                    <span className="text-xs text-muted tabular-nums">{(opacity * 100).toFixed(0)}%</span>
                </div>
                <div className="border rounded-md overflow-hidden border-muted/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heatmapUrl} alt="heatmap" className="w-full block" style={{ opacity }} />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3" aria-label="XAI Heatmap overlay">
            <div className="flex items-center justify-between">
                <div className="text-xs text-muted">Overlay opacity</div>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    aria-label="Heatmap opacity"
                    className="w-24"
                />
                <span className="text-xs text-muted tabular-nums">{(opacity * 100).toFixed(0)}%</span>
            </div>
            <div className="border rounded-md overflow-hidden border-muted/20">
                <canvas ref={canvasRef} className="w-full block" />
            </div>
        </div>
    );
}