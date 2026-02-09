// "use client";

// import { motion } from "framer-motion";

export default function MetricsDashboardPage() {}
//     const sessionMetrics = [
//         { label: "Total Analyses", value: "247", color: "from-blue-500 to-blue-600" },
//         { label: "Avg Confidence", value: "92.3%", color: "from-green-500 to-emerald-500" },
//         { label: "Segmentation Quality", value: "0.847", color: "from-purple-500 to-pink-500" },
//         { label: "Processing Time", value: "245ms", color: "from-orange-500 to-red-500" }
//         [
//             { label: "Model Accuracy", value: 0.98 },
//             { label: "F1 Score", value: 0.957 },
//             { label: "Precision", value: 0.978 },
//             { label: "Recall", value: 0.937 }
//         ].map((metric, i) => (
//             { class: "Parabasal", count: 35, percentage: 14 },
//             { class: "Superficial-Intermediate", count: 23, percentage: 10 }
//     ];

//     const timeSeriesData = [
//         { hour: "00:00", analyses: 12 },
//         { hour: "04:00", analyses: 8 },
//         { hour: "08:00", analyses: 34 },
//         { hour: "12:00", analyses: 52 },
//         { hour: "16:00", analyses: 61 },
//         { hour: "20:00", analyses: 45 }
//     ];

//     const maxAnalyses = Math.max(...timeSeriesData.map(d => d.analyses));

//     return (
//         <div className="max-w-6xl mx-auto space-y-10">
//             {/* Header */}
//             <section className="space-y-4">
//                 <motion.h1
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-3xl md:text-4xl font-bold"
//                 >
//                     Quality Metrics Dashboard
//                 </motion.h1>
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     "use client";

//                 import {motion} from "framer-motion";

//                 export default function MetricsDashboardPage() {
//                         const sessionMetrics = [
//                 {label: "Total Analyses", value: "247", color: "from-blue-500 to-blue-600" },
//                 {label: "Avg Confidence", value: "92.3%", color: "from-green-500 to-emerald-500" },
//                 {label: "Segmentation Quality", value: "0.847", color: "from-purple-500 to-pink-500" },
//                 {label: "Processing Time", value: "245ms", color: "from-orange-500 to-red-500" }
//                 ];

//                 const classDistribution = [
//                 {class: "Dyskeratotic", count: 38, percentage: 15 },
//                 {class: "Koilocytotic", count: 89, percentage: 36 },
//                 {class: "Metaplastic", count: 62, percentage: 25 },
//                 {class: "Parabasal", count: 35, percentage: 14 },
//                 {class: "Superficial-Intermediate", count: 23, percentage: 10 }
//                 ];

//                 const timeSeriesData = [
//                 {hour: "00:00", analyses: 12 },
//                 {hour: "04:00", analyses: 8 },
//                 {hour: "08:00", analyses: 34 },
//                 {hour: "12:00", analyses: 52 },
//                 {hour: "16:00", analyses: 61 },
//                 {hour: "20:00", analyses: 45 }
//                 ];

//                         const maxAnalyses = Math.max(...timeSeriesData.map(d => d.analyses));

//                 return (
//                 <div className="max-w-6xl mx-auto space-y-10">
//                     <section className="space-y-4">
//                         <motion.h1
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-3xl md:text-4xl font-bold"
//                         >
//                             Quality Metrics Dashboard
//                         </motion.h1>
//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.2 }}
//                             className="text-lg text-muted max-w-3xl"
//                         >
//                             Comprehensive analytics and quality metrics for analyses performed.
//                         </motion.p>
//                     </section>

//                     <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {sessionMetrics.map((metric, i) => (
//                             <motion.div
//                                 key={metric.label}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: i * 0.1 }}
//                                 className="card space-y-3 relative overflow-hidden"
//                             >
//                                 <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 pointer-events-none`} />
//                                 <div className="relative">
//                                     <p className="text-xs text-muted font-semibold uppercase">{metric.label}</p>
//                                     <div className={`text-3xl font-bold text-transparent bg-gradient-to-r ${metric.color} bg-clip-text`}>
//                                         {metric.value}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </section>

//                     <div className="grid lg:grid-cols-2 gap-6">
//                         <motion.section
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="card space-y-4"
//                         >
//                             <h2 className="text-xl font-bold">Classification Distribution</h2>
//                             <div className="space-y-4">
//                                 {classDistribution.map((item, i) => (
//                                     <div key={item.class} className="space-y-2">
//                                         <div className="flex items-center justify-between">
//                                             <span className="text-sm font-semibold">{item.class}</span>
//                                             <span className="text-sm text-muted">{item.count} ({item.percentage}%)</span>
//                                         </div>
//                                         <motion.div
//                                             initial={{ width: 0 }}
//                                             animate={{ width: "100%" }}
//                                             transition={{ duration: 0.6, delay: i * 0.1 }}
//                                             className="h-2 bg-[var(--color-bg)] rounded-full overflow-hidden"
//                                         >
//                                             <motion.div
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${item.percentage}%` }}
//                                                 transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
//                                                 className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
//                                             />
//                                         </motion.div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.section>

//                         <motion.section
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.4 }}
//                             className="card space-y-4"
//                         >
//                             <h2 className="text-xl font-bold">Analysis Frequency (24h)</h2>
//                             <div className="space-y-4">
//                                 <div className="h-48 flex items-end gap-1 p-4 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)]">
//                                     {timeSeriesData.map((data, i) => (
//                                         <motion.div
//                                             key={i}
//                                             initial={{ height: 0 }}
//                                             animate={{ height: `${(data.analyses / maxAnalyses) * 100}%` }}
//                                             transition={{ duration: 0.6, delay: i * 0.1 }}
//                                             className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
//                                             title={`${data.hour}: ${data.analyses} analyses`}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="flex items-center justify-between text-xs text-muted px-1">
//                                     <span>00:00</span>
//                                     <span>12:00</span>
//                                     <span>20:00</span>
//                                 </div>
//                             </div>
//                         </motion.section>
//                     </div>

//                     <motion.section
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5 }}
//                         className="card space-y-6"
//                     >
//                         <h2 className="text-xl font-bold">Performance Metrics</h2>
//                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//                             {[
//                                 { label: "Model Accuracy", value: 0.98 },
//                                 { label: "F1 Score", value: 0.957 },
//                                 { label: "Precision", value: 0.978 },
//                                 { label: "Recall", value: 0.937 }
//                             ].map((metric, i) => (
//                                 <motion.div
//                                     key={metric.label}
//                                     initial={{ opacity: 0, scale: 0.9 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ delay: 0.6 + i * 0.1 }}
//                                     className="space-y-3 p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
//                                 >
//                                     <p className="text-xs text-muted font-semibold uppercase">{metric.label}</p>
//                                     <div className="space-y-2">
//                                         <p className="text-2xl font-bold text-blue-400">{(metric.value * 100).toFixed(1)}%</p>
//                                         <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
//                                             <motion.div
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${metric.value * 100}%` }}
//                                                 transition={{ duration: 0.8 }}
//                                                 className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
//                                             />
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.section>

//                     <motion.section
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.7 }}
//                         className="card space-y-4"
//                     >
//                         <h2 className="text-xl font-bold">Quality Alerts</h2>
//                         <div className="space-y-3">
//                             {[
//                                 { type: "success", message: "All models performing within expected parameters" },
//                                 { type: "warning", message: "2 low-quality images detected in last 24 hours" },
//                                 { type: "info", message: "Average processing time: 245ms (2% improvement)" }
//                             ].map((alert, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, x: -10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: 0.8 + i * 0.1 }}
//                                     className={`p-4 rounded-lg border ${alert.type === "success"
//                                         ? "bg-green-500/5 border-green-500/20"
//                                         : alert.type === "warning"
//                                             ? "bg-amber-500/5 border-amber-500/20"
//                                             : "bg-blue-500/5 border-blue-500/20"
//                                         }`}
//                                 >
//                                     <p className="text-sm text-muted">{alert.message}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.section>
//                 </div>
//                 );
//                     }
//                 transition={{ duration: 0.8 }}
