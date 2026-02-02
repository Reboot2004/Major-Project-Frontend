"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PredictResponse, AnalysisReport } from "@/lib/api";
import { generateReport, exportPDF } from "@/lib/api";

interface Props {
    result: PredictResponse;
    imageFile?: File;
}

export default function ReportExport({ result, imageFile }: Props) {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<AnalysisReport | null>(null);
    const [exporting, setExporting] = useState(false);
    const [patientId, setPatientId] = useState("");
    const [analysisDate, setAnalysisDate] = useState(new Date().toISOString().split("T")[0]);
    const [sampleId, setSampleId] = useState("");
    const [clinician, setClinician] = useState("");
    const [notes, setNotes] = useState("");

    const handleGenerateReport = async () => {
        if (!imageFile) {
            alert("Image file is required for report generation");
            return;
        }
        if (!patientId.trim()) {
            alert("Patient ID is required for report generation");
            return;
        }

        setLoading(true);
        try {
            const reportData = await generateReport(result, imageFile, {
                patient_id: patientId.trim(),
                analysis_date: analysisDate,
                sample_id: sampleId.trim() || undefined,
                clinician: clinician.trim() || undefined,
                notes: notes.trim() || undefined,
            });
            setReport(reportData);
        } catch (error) {
            console.error("Failed to generate report:", error);
            alert("Failed to generate report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        if (!report) return;

        setExporting(true);
        try {
            const pdfBlob = await exportPDF(report);
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `cervical_analysis_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export PDF:", error);
            alert("Failed to export PDF. Please try again.");
        } finally {
            setExporting(false);
        }
    };

    const handleDownloadJSON = () => {
        const dataStr = JSON.stringify(result, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `analysis_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-4"
        >
            <div>
                <h3 className="text-xl font-bold">Export Analysis Report</h3>
                <p className="text-sm text-muted mt-1">Download comprehensive analysis results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted">Patient ID *</label>
                    <input
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                        placeholder="Enter patient ID"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted">Analysis Date</label>
                    <input
                        type="date"
                        value={analysisDate}
                        onChange={(e) => setAnalysisDate(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted">Sample ID</label>
                    <input
                        type="text"
                        value={sampleId}
                        onChange={(e) => setSampleId(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                        placeholder="Optional"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted">Clinician</label>
                    <input
                        type="text"
                        value={clinician}
                        onChange={(e) => setClinician(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                        placeholder="Optional"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-muted">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                        placeholder="Optional notes for the report"
                        rows={3}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Generate Report */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateReport}
                    disabled={loading || !imageFile}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all ${loading || !imageFile
                        ? "bg-[var(--color-border)] text-muted cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Generate Report
                        </>
                    )}
                </motion.button>

                {/* Export PDF */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportPDF}
                    disabled={!report || exporting}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all ${!report || exporting
                        ? "bg-[var(--color-border)] text-muted cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25"
                        }`}
                >
                    {exporting ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Exporting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export as PDF
                        </>
                    )}
                </motion.button>

                {/* Download JSON */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadJSON}
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download JSON
                </motion.button>

                {/* Copy to Clipboard */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                        alert("Analysis data copied to clipboard!");
                    }}
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/25 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                </motion.button>
            </div>

            {/* Report Preview */}
            {report && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-bold">Report Generated Successfully</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted">Patient ID</p>
                            <p className="font-semibold">{report.patient_id || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-muted">Analysis Date</p>
                            <p className="font-semibold">{report.analysis_date}</p>
                        </div>
                        <div>
                            <p className="text-muted">Primary Diagnosis</p>
                            <p className="font-semibold text-blue-400">{report.primary_diagnosis}</p>
                        </div>
                        <div>
                            <p className="text-muted">Confidence</p>
                            <p className="font-semibold text-green-400">{(report.confidence * 100).toFixed(1)}%</p>
                        </div>
                    </div>

                    {report.xai_insights && report.xai_insights.length > 0 && (
                        <div>
                            <p className="text-sm text-muted mb-2">XAI Insights</p>
                            <ul className="space-y-1">
                                {report.xai_insights.map((insight, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                        <span className="text-blue-400">•</span>
                                        <span>{insight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {report.recommendations && report.recommendations.length > 0 && (
                        <div>
                            <p className="text-sm text-muted mb-2">Recommendations</p>
                            <ul className="space-y-1">
                                {report.recommendations.map((rec, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
