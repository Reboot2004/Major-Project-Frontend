# Cervical Cell Frontend (Next.js)

Multi-page frontend for the hybrid ConvNeXt classifier + Attention U-Net segmenter + XAI visualizations.

## Pages
- `/` Home overview
- `/demo` Interactive upload (classification, segmentation, XAI) with blended overlays
- `/models` Model summaries and comparison placeholders
- `/xai` Explainability overview and methodology
- `/dataset` Dataset overview and class taxonomy
- `/about` Project information

## Configure
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Run (Windows PowerShell)
```powershell
cd "d:/Projects/Major Project/frontend"
npm install
npm run dev
```
Open http://localhost:3000

## Expected API
- `POST {API}/api/v1/segmentation/predict` (multipart `file`) → `{ predicted_class, probabilities, segmentation_mask_base64, xai_heatmap_base64 }`
- `GET {API}/api/v1/classification/classes` → `["Dyskeratotic", "Koilocytotic", "Metaplastic", "Parabasal", "Superficial-Intermediate"]`
- Optional: `POST {API}/api/v1/classification/predict` for classification only.

If the backend is not running, a mock response is returned for local UI development.

## Design System
The design system is implemented via CSS variables (design tokens) in `app/globals.css`.

### Tokens
- Color (light/dark): `--color-bg`, `--color-bg-alt`, `--color-fg`, `--color-fg-muted`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-danger`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Shadow: `--shadow-sm`, `--shadow-md`
- Transition: `--transition`

### Component Primitives
- `.btn` / `.btn-secondary` for primary and secondary actions
- `.card` structured container with consistent padding and radius
- `.skeleton` loading placeholder shimmer
- Focus ring via `:focus-visible` uses accent color for accessibility

### Theming
Dark mode is toggled using a root `data-theme="dark"` attribute (`ThemeToggle` component). Prefers-color-scheme applies if no explicit selection.

### Accessibility
- All interactive components use visible focus states
- ARIA labels added to upload zone, heatmap overlay, segmentation blend
- Toast notifications use `aria-live="polite"`

### Interaction Enhancements
- Heatmap opacity slider (`HeatmapOverlay`)
- Segmentation blended canvas with adjustable mask alpha (`SegmentationBlend`)
- Toast notifications (`ToastStore`) for success/error states
- Mock API fallback for offline development

## Development Notes
- Adjust tokens in `globals.css` to refine visual design
- Extend toast variants if required (info, warning)
- Replace mock response when backend endpoints become available

## Testing Ideas
- Visual: Snapshot test of probability list ordering
- Accessibility: Ensure focus traversal includes ThemeToggle and sliders
- Interactivity: Opacity slider updates image style, segmentation alpha updates canvas layering

## Next Steps
- Add comparison metrics table to `/models`
- Integrate real segmentation mask color legend
- Add toggle between Score-CAM and Layer-CAM when backend supports multiple heatmaps

## License
See root project license (MIT) for usage terms.
