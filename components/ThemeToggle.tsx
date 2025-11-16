"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [hue, setHue] = useState(210);
    const [mode, setMode] = useState<"light" | "dark">("dark");
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const storedHue = localStorage.getItem("theme-hue");
        const storedMode = localStorage.getItem("theme-mode") as "light" | "dark";
        if (storedHue) setHue(parseInt(storedHue));
        if (storedMode) setMode(storedMode);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.style.setProperty("--theme-hue", hue.toString());
        localStorage.setItem("theme-hue", hue.toString());
    }, [hue, mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (mode === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        localStorage.setItem("theme-mode", mode);
    }, [mode, mounted]);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    if (!mounted) return null;

    return (
        <div className="relative">
            <button
                className="btn-secondary flex items-center gap-2"
                onClick={() => setOpen(!open)}
                aria-label="Open color picker"
            >
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${hue}, 70%, 55%)` }}
                />
                Color
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 p-4 card z-50 w-64 space-y-4"
                    >
                        <div>
                            <div className="text-xs text-muted mb-2">Mode</div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMode("dark")}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${mode === "dark"
                                        ? "bg-[var(--color-accent)] text-white"
                                        : "bg-[var(--color-bg-alt)] hover:bg-[var(--color-border)]"
                                        }`}
                                >
                                    Dark
                                </button>
                                <button
                                    onClick={() => setMode("light")}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${mode === "light"
                                        ? "bg-[var(--color-accent)] text-white"
                                        : "bg-[var(--color-bg-alt)] hover:bg-[var(--color-border)]"
                                        }`}
                                >
                                    Light
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-muted mb-2">Theme Color</div>
                            <input
                                type="range"
                                min={0}
                                max={360}
                                value={hue}
                                onChange={(e) => setHue(parseInt(e.target.value))}
                                className="w-full accent-[hsl(var(--theme-hue),70%,55%)]"
                                aria-label="Theme hue selector"
                            />
                            <div className="mt-3 flex gap-2">
                                {[210, 280, 330, 30, 160].map((h) => (
                                    <button
                                        key={h}
                                        onClick={() => setHue(h)}
                                        className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                                        style={{
                                            backgroundColor: `hsl(${h}, 70%, 55%)`,
                                            borderColor: h === hue ? "var(--color-fg)" : "transparent",
                                            boxShadow: h === hue ? `0 0 12px hsl(${h}, 70%, 55%, 0.5)` : "none"
                                        }}
                                        aria-label={`Preset hue ${h}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}