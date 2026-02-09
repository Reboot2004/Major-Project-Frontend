// Quality Assessment Types
export type QualityAssessment = {
    quality_score: number; // 0-100
    quality_level: "poor" | "fair" | "good" | "excellent";
    issues: string[];
    normalized_image_base64?: string; // After stain normalization
    recommendations: string[];
};

// Uncertainty & Confidence Types
export type UncertaintyMetrics = {
    confidence: number; // 0-100, main prediction confidence
    entropy: number; // Prediction entropy
    uncertainty_lower: number; // Lower bound
    uncertainty_upper: number; // Upper bound
    prediction_stability: number; // 0-100, stability across variations
};

// Segmentation Metrics (simplified: remove IOU/DSC/F1)
export type SegmentationMetrics = {
    coverage_ratio: number; // proportion of image segmented
    num_cells: number; // connected components count
    avg_cell_size: number; // average size in pixels
    edge_density: number; // boundary complexity
    avg_solidity: number; // compactness of segments
    accuracy: number; // proxy: equals coverage_ratio
};

// Multi-Cell Detection
export type DetectedCell = {
    cell_id: string;
    bounding_box: { x: number; y: number; width: number; height: number };
    confidence: number;
    cell_image_base64: string;
};

export type MultiCellDetectionResult = {
    total_cells: number;
    cells: DetectedCell[];
    image_with_boxes_base64?: string;
};

// Clinical Decision Support
export type ClinicalDecision = {
    risk_level: "low" | "moderate" | "high" | "critical";
    risk_score: number; // 0-100
    primary_class: string;
    secondary_candidates: { class: string; probability: number }[];
    recommendations: string[];
    needs_review: boolean;
    review_reason?: string;
};

// Enhanced Response Type
export type PredictResponse = {
    predicted_class: string;
    probabilities: Record<string, number>;

    // Original features
    original_image_base64?: string;
    segmentation_mask_base64?: string;
    xai_scorecam_base64?: string;
    xai_layercam_base64?: string;
    metrics?: SegmentationMetrics;

    // New features
    quality?: QualityAssessment;
    uncertainty?: UncertaintyMetrics;
    multi_cell?: MultiCellDetectionResult;
    clinical_decision?: ClinicalDecision;
    normalized_image_base64?: string;

    // Metadata
    processing_time_ms?: number;
    model_version?: string;
};

// Batch Processing Types
export type BatchJob = {
    job_id: string;
    status: "pending" | "processing" | "completed" | "failed";
    total_files: number;
    processed_files: number;
    results: PredictResponse[];
    created_at: string;
    completed_at?: string;
};

// Report Export
export type AnalysisReport = {
    patient_id?: string;
    analysis_date: string;
    image_filename: string;
    primary_diagnosis: string;
    confidence: number;
    risk_assessment: ClinicalDecision;
    segmentation_quality: SegmentationMetrics;
    quality_assessment: QualityAssessment;
    xai_insights: string[];
    recommendations: string[];
    analyst_notes?: string;
};

// Historical Predictions (MongoDB)
export type HistoricalPrediction = {
    id: string;
    patient_id?: string;
    patient_name?: string;
    kind?: string;
    model?: string;
    xaiMethod?: string;
    magnification?: string | number;
    classification?: string;
    probabilities?: Record<string, number>;
    quality?: unknown;
    uncertainty?: unknown;
    clinical_decision?: ClinicalDecision;
    metrics?: SegmentationMetrics;
    images?: {
        original?: string;
        segmentation?: string;
        scorecam?: string;
        layercam?: string;
        [key: string]: unknown;
    };
    timestamp?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function classify(file: File): Promise<PredictResponse> {
    console.log("[Frontend API] Starting classification request...");
    console.log("[Frontend API] File:", file.name, "Size:", file.size, "bytes");
    console.log("[Frontend API] Target URL:", `${API_URL}/api/v1/classification/predict`);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_URL}/api/v1/classification/predict`, { method: "POST", body: form });
    console.log("[Frontend API] Response status:", res.status, res.statusText);

    if (!res.ok) throw new Error(`Classification failed: ${res.status}`);

    const data = await res.json();
    console.log("[Frontend API] Classification response:", data);
    console.log("[Frontend API] Predicted class:", data.predicted_class);
    console.log("[Frontend API] ScoreCAM present:", !!data.xai_scorecam_base64);
    console.log("[Frontend API] LayerCAM present:", !!data.xai_layercam_base64);

    return data;
}

export async function segment(file: File): Promise<PredictResponse> {
    console.log("[Frontend API] Starting segmentation request...");
    console.log("[Frontend API] File:", file.name, "Size:", file.size, "bytes");
    console.log("[Frontend API] Target URL:", `${API_URL}/api/v1/segmentation/predict`);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_URL}/api/v1/segmentation/predict`, { method: "POST", body: form });
    console.log("[Frontend API] Response status:", res.status, res.statusText);

    if (!res.ok) throw new Error(`Segmentation failed: ${res.status}`);

    const data = await res.json();
    console.log("[Frontend API] Segmentation response:", data);
    console.log("[Frontend API] Predicted class:", data.predicted_class);
    console.log("[Frontend API] Segmentation mask present:", !!data.segmentation_mask_base64);
    console.log("[Frontend API] ScoreCAM present:", !!data.xai_scorecam_base64);
    console.log("[Frontend API] LayerCAM present:", !!data.xai_layercam_base64);
    console.log("[Frontend API] Original image present:", !!data.original_image_base64);
    console.log("[Frontend API] Metrics present:", !!data.metrics);
    if (data.metrics) {
        console.log("[Frontend API] Metrics:", data.metrics);
    }

    return data;
}

// Combined convenience call
export async function classifyAndSegment(file: File, patient?: { id?: string; name?: string }): Promise<PredictResponse> {
    console.log("[Frontend API] Calling classifyAndSegment...");

    const form = new FormData();
    form.append("file", file);

    if (patient?.id) {
        form.append("patient_id", patient.id);
    }
    if (patient?.name) {
        form.append("patient_name", patient.name);
    }

    const res = await fetch(`${API_URL}/api/v1/segmentation/predict`, { method: "POST", body: form });
    console.log("[Frontend API] Response status (classifyAndSegment):", res.status, res.statusText);
    if (!res.ok) throw new Error(`Segmentation failed: ${res.status}`);

    const data = await res.json();
    console.log("[Frontend API] classifyAndSegment response:", data);
    return data;
}

// Quality Assessment
export async function assessQuality(file: File): Promise<QualityAssessment> {
    console.log("[Frontend API] Starting quality assessment...");
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_URL}/api/v1/quality-assessment`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Quality assessment failed: ${res.status}`);
    const data = await res.json();
    return (data as any).quality ?? data;
}

// Stain Normalization
export async function normalizStain(file: File, target: File): Promise<{ normalized_image_base64: string }> {
    console.log("[Frontend API] Starting stain normalization...");
    const form = new FormData();
    form.append("file", file);
    form.append("target", target);

    const res = await fetch(`${API_URL}/api/v1/stain-normalization`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Stain normalization failed: ${res.status}`);

    return res.json();
}

// Multi-Cell Detection
export async function detectMultipleCells(file: File): Promise<MultiCellDetectionResult> {
    console.log("[Frontend API] Starting multi-cell detection...");
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_URL}/api/v1/multi-cell-detect`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Multi-cell detection failed: ${res.status}`);
    const data = await res.json();
    return (data as any).multi_cell ?? data;
}

// Batch Processing
export async function submitBatch(files: File[]): Promise<BatchJob> {
    console.log("[Frontend API] Submitting batch job...");
    const form = new FormData();
    files.forEach(file => form.append("files", file));

    const res = await fetch(`${API_URL}/api/v1/batch-process`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Batch processing failed: ${res.status}`);

    return res.json();
}

export async function getBatchStatus(jobId: string): Promise<BatchJob> {
    console.log("[Frontend API] Getting batch status...");

    const res = await fetch(`${API_URL}/api/v1/batch-process/${jobId}`);
    if (!res.ok) throw new Error(`Failed to get batch status: ${res.status}`);

    return res.json();
}

// Report Generation
export async function generateReport(analysis: PredictResponse, imageFile: File, metadata?: Record<string, unknown>): Promise<AnalysisReport> {
    console.log("[Frontend API] Generating analysis report...");
    const form = new FormData();
    form.append("file", imageFile);
    const payload = metadata ? { ...analysis, ...metadata } : analysis;
    form.append("analysis", JSON.stringify(payload));

    const res = await fetch(`${API_URL}/api/v1/generate-report`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Report generation failed: ${res.status}`);

    return res.json();
}

export async function exportPDF(report: AnalysisReport): Promise<Blob> {
    console.log("[Frontend API] Exporting report as PDF...");

    const res = await fetch(`${API_URL}/api/v1/export-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report)
    });
    if (!res.ok) throw new Error(`PDF export failed: ${res.status}`);

    return res.blob();
}

export async function getClasses(): Promise<string[]> {
    const res = await fetch(`${API_URL}/api/v1/classification/classes`);
    if (!res.ok) throw new Error("Failed to fetch classes");
    return res.json();
}

export function toDataUrl(base64?: string) {
    if (!base64) return undefined;
    return `data:image/png;base64,${base64}`;
}

// Historical predictions
export async function getOldPredictions(): Promise<HistoricalPrediction[]> {
    console.log("[Frontend API] Fetching previous predictions...");
    const res = await fetch(`${API_URL}/api/oldpreds`);
    if (!res.ok) throw new Error(`Failed to fetch previous predictions: ${res.status}`);
    const data = await res.json();
    console.log("[Frontend API] Previous predictions count:", Array.isArray(data) ? data.length : 0);
    return data;
}

export async function getOldPredictionById(id: string): Promise<HistoricalPrediction> {
    console.log("[Frontend API] Fetching previous prediction by id...", id);
    const res = await fetch(`${API_URL}/api/oldpreds/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch previous prediction: ${res.status}`);
    return res.json();
}

export async function downloadHistoricalPdf(id: string): Promise<void> {
    console.log("[Frontend API] Downloading historical PDF for id", id);
    const res = await fetch(`${API_URL}/api/oldpreds/${id}/pdf`);
    if (!res.ok) throw new Error(`Failed to download PDF: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `herhealth_analysis_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export async function downloadHistoricalReport(id: string): Promise<Blob> {
    console.log("[Frontend API] Downloading historical report for id", id);
    const res = await fetch(`${API_URL}/api/oldpreds/${id}/report`);
    if (!res.ok) throw new Error(`Failed to download report: ${res.status}`);
    return res.blob();
}
