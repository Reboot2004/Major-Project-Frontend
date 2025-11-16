export type PredictResponse = {
    predicted_class: string;
    probabilities: Record<string, number>;
    segmentation_mask_base64?: string; // PNG base64 (no data URI prefix)
    xai_heatmap_base64?: string; // PNG base64 (no data URI prefix)
    metrics?: {
        f1?: number;
        iou?: number;
        dice?: number;
    };
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
    console.log("[Frontend API] XAI heatmap present:", !!data.xai_heatmap_base64);

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
    console.log("[Frontend API] XAI heatmap present:", !!data.xai_heatmap_base64);

    return data;
}

// Combined convenience call; falls back to mock result if backend unreachable.
export async function classifyAndSegment(file: File): Promise<PredictResponse> {
    console.log("[Frontend API] Calling classifyAndSegment...");
    try {
        const seg = await segment(file);
        console.log("[Frontend API] ✅ Using real backend data");
        return seg;
    } catch (e) {
        console.warn("[Frontend API] ⚠️ Backend unreachable, falling back to mock response", e);
        const mock = mockResponse();
        console.log("[Frontend API] 🎭 Returning mock data:", mock);
        return mock;
    }
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

function mockResponse(): PredictResponse {
    return {
        predicted_class: "Koilocytotic",
        probabilities: {
            Dyskeratotic: 0.05,
            Koilocytotic: 0.62,
            Metaplastic: 0.12,
            Parabasal: 0.08,
            "Superficial-Intermediate": 0.13
        },
        segmentation_mask_base64: undefined,
        xai_heatmap_base64: undefined,
        metrics: { f1: 0.62 }
    };
}
