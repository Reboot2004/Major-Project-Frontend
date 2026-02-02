import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ToastViewport from "@/components/ToastStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HerHealth.AI - AI-Powered Cervical Cancer Detection",
    description: "Advanced cervical cell analysis using deep learning for early cancer detection. Empowering women's health through explainable AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
                <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-bg)]/80 backdrop-blur-xl">
                    <nav className="container h-16 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                                <span className="text-[var(--color-accent)] text-sm font-black">H</span>
                            </div>
                            Her<span className="text-[var(--color-accent)]">Health</span><span>.AI</span>
                        </Link>
                        <div className="flex items-center gap-8">
                            <ul className="flex items-center gap-1 text-sm">
                                <li><Link href="/demo" className="px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">Demo</Link></li>
                                <li><Link href="/models" className="px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">Models</Link></li>
                                <li><Link href="/xai" className="px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">XAI</Link></li>
                                <li><Link href="/dataset" className="px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">Dataset</Link></li>
                                <li><Link href="/about" className="px-3 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors">About</Link></li>
                            </ul>
                            <ThemeToggle />
                        </div>
                    </nav>
                </header>
                <main className="container flex-1 py-10" role="main">{children}</main>
                <footer className="border-t border-white/10 bg-[var(--color-bg-alt)]/50 backdrop-blur-sm mt-20">
                    <div className="container py-10 space-y-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                                    <span className="text-[var(--color-accent)] text-sm font-black">H</span>
                                </div>
                                <div>
                                    <div className="font-bold text-base">Her<span className="text-[var(--color-accent)]">Health</span>.AI</div>
                                    <div className="text-xs text-muted">Empowering women through AI</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span>System Operational</span>
                                </div>
                                <span>•</span>
                                <span>98.5% Accuracy</span>
                                <span>•</span>
                                <span>© {new Date().getFullYear()}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                            <div className="px-3 py-1.5 rounded-full bg-[var(--color-border)]/50 backdrop-blur-sm">
                                ConvNeXt-Tiny
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-[var(--color-border)]/50 backdrop-blur-sm">
                                Attention U-Net
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-[var(--color-border)]/50 backdrop-blur-sm">
                                Score-CAM XAI
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-[var(--color-border)]/50 backdrop-blur-sm">
                                ONNX Runtime
                            </div>
                        </div>
                        <div className="text-center text-xs text-muted pt-4 border-t border-white/5">
                            Built with Next.js 14, Spring Boot 3, and state-of-the-art deep learning models
                        </div>
                    </div>
                </footer>
                <ToastViewport />
            </body>
        </html>
    );
}
