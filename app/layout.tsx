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
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <header className="border-b border-white/10">
                    <nav className="container h-16 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            Her<span className="text-[var(--color-accent)]">Health</span>.AI
                        </Link>
                        <div className="flex items-center gap-8">
                            <ul className="flex items-center gap-6 text-sm text-muted">
                                <li><Link href="/demo">Demo</Link></li>
                                <li><Link href="/models">Models</Link></li>
                                <li><Link href="/xai">XAI</Link></li>
                                <li><Link href="/dataset">Dataset</Link></li>
                                <li><Link href="/about">About</Link></li>
                            </ul>
                            <ThemeToggle />
                        </div>
                    </nav>
                </header>
                <main className="container flex-1 py-10" role="main">{children}</main>
                <footer className="border-t border-white/10">
                    <div className="container py-8 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-sm">Her<span className="text-[var(--color-accent)]">Health</span>.AI</div>
                            <div className="text-xs text-muted">Empowering women through AI</div>
                        </div>
                        <div className="text-xs text-muted">
                            Powered by ConvNeXt + Attention U-Net + Explainable AI • © {new Date().getFullYear()}
                        </div>
                    </div>
                </footer>
                <ToastViewport />
            </body>
        </html>
    );
}
