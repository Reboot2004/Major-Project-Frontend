"use client";
import { create } from "zustand";
import React, { useEffect } from "react";

export type Toast = { id: string; message: string; type?: "success" | "error" | "info"; ttl?: number };

interface ToastState {
    toasts: Toast[];
    push: (t: Omit<Toast, "id">) => void;
    remove: (id: string) => void;
}

export const useToast = create<ToastState>((set, get) => ({
    toasts: [],
    push: (t) => {
        const id = Math.random().toString(36).slice(2);
        const toast: Toast = { id, ttl: 4000, ...t };
        set({ toasts: [...get().toasts, toast] });
    },
    remove: (id) => set({ toasts: get().toasts.filter(t => t.id !== id) })
}));

export function ToastViewport() {
    const { toasts, remove } = useToast();
    useEffect(() => {
        const timers = toasts.map(t => setTimeout(() => remove(t.id), t.ttl));
        return () => { timers.forEach(clearTimeout); };
    }, [toasts, remove]);
    return (
        <div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 w-80">
            {toasts.map(t => (
                <div key={t.id} className="card text-sm flex items-start gap-3" style={{ borderColor: variantColor(t.type) }}>
                    <div className="flex-1">
                        <strong className="block mb-1" style={{ color: variantColor(t.type) }}>{capitalize(t.type || "info")}</strong>
                        <div className="text-muted">{t.message}</div>
                    </div>
                    <button onClick={() => remove(t.id)} className="btn-secondary px-2 py-1 text-xs">Close</button>
                </div>
            ))}
        </div>
    );
}

function variantColor(type?: string) {
    switch (type) {
        case "success": return "#15803d";
        case "error": return "#b91c1c";
        default: return "var(--color-accent)";
    }
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default ToastViewport;