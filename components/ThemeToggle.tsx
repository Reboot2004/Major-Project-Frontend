"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<"light" | "dark">("dark");

    useEffect(() => {
        setMounted(true);
        const storedMode = localStorage.getItem("theme-mode") as "light" | "dark";
        if (storedMode) setMode(storedMode);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (mode === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        localStorage.setItem("theme-mode", mode);
    }, [mode, mounted]);

    if (!mounted) return null;

    return (
        <button
            type="button"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            className="relative inline-flex items-center h-8 w-16 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            role="switch"
            aria-checked={mode === "light"}
        >
            <span
                className={`absolute inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] text-white shadow-sm transition-transform duration-200 ${mode === "light" ? "translate-x-8" : "translate-x-1"}`}
            >
                {mode === "light" ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m9.9 9.9l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                    </svg>
                )}
            </span>
        </button>
    );
}