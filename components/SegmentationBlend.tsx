"use client";
import { useEffect, useRef, useState } from "react";

interface Props { original: string; mask: string; }
export default function SegmentationBlend({ original, mask }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [alpha, setAlpha] = useState(0.5);

    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext("2d"); if (!ctx) return;
        const imgOrig = new Image(); const imgMask = new Image();
        imgOrig.src = original; imgMask.src = mask;
        let loaded = 0;
        function draw() {
            const currentCanvas = canvasRef.current;
            if (!currentCanvas) return;
            currentCanvas.width = imgOrig.width; currentCanvas.height = imgOrig.height;
            ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
            ctx.drawImage(imgOrig, 0, 0);
            ctx.globalAlpha = alpha;
            ctx.drawImage(imgMask, 0, 0);
            ctx.globalAlpha = 1;
        }
        function handleLoad() { loaded++; if (loaded === 2) draw(); }
        imgOrig.onload = handleLoad; imgMask.onload = handleLoad;
    }, [original, mask, alpha]);

    return (
        <div className="space-y-2" aria-label="Segmentation blended overlay">
            <div className="text-xs text-muted">Blend overlay</div>
            <canvas ref={canvasRef} className="w-full rounded-md border" style={{ borderColor: "var(--color-border)" }} />
            <label className="flex items-center gap-2 text-xs text-muted">
                Opacity
                <input type="range" min={0} max={1} step={0.05} value={alpha} onChange={e => setAlpha(parseFloat(e.target.value))} aria-label="Segmentation mask opacity" />
            </label>
        </div>
    );
}
