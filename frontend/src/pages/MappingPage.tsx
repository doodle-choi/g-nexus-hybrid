import { ArrowRight, CheckCircle, Link2, AlertTriangle } from "lucide-react";
import { mockSourceFields, mockTargetFields } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MappingPage() {
    return (
        <div className="p-6 space-y-6 max-w-[1200px] mx-auto bg-background">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Data Mapping</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Map raw source fields to G-Nexus standard schema</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                        Reset
                    </button>
                    <button
                        onClick={() => toast.success("Mapping rule saved!", { description: "qa_report_feb_2026.json → Standard Schema" })}
                        className="px-4 py-2 rounded-lg bg-[#1428A0] text-white text-xs font-semibold hover:bg-[#0f1f85] transition"
                    >
                        Save Mapping Rule
                    </button>
                </div>
            </div>

            {/* Source file badge */}
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl px-4 py-3">
                <div className="h-8 w-8 rounded-lg bg-[#1428A0] flex items-center justify-center shrink-0">
                    <Link2 size={14} className="text-white" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Active Source File</p>
                    <p className="font-mono text-xs text-[#1428A0] mt-0.5">qa_report_feb_2026.json</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle size={13} /> Validated (312 records)
                </div>
            </div>

            {/* Mapping canvas */}
            <div className="grid grid-cols-[1fr_64px_1fr] gap-4 items-start">
                {/* Source fields */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Source Fields (Raw)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Drag a field to the target on the right</p>
                    </div>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800 p-2 space-y-1">
                        {mockSourceFields.map(f => (
                            <li key={f} draggable
                                className={cn(
                                    "px-3 py-2 rounded-lg font-mono text-xs text-slate-600 dark:text-slate-400 cursor-grab",
                                    "border border-transparent hover:border-[#1428A0]/30 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition",
                                    mockTargetFields.some(t => t.mapped === f) && "opacity-40"
                                )}
                            >{f}</li>
                        ))}
                    </ul>
                </div>

                {/* Arrow column */}
                <div className="flex flex-col items-center justify-center pt-20 gap-4">
                    {mockTargetFields.map((_, i) => (
                        <div key={i} className="h-[44px] flex items-center">
                            <ArrowRight size={16} className="text-slate-300 dark:text-slate-600" />
                        </div>
                    ))}
                </div>

                {/* Target fields */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Target Schema (Standard)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">System-defined G-Nexus fields</p>
                    </div>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800 p-2 space-y-1">
                        {mockTargetFields.map(f => (
                            <li key={f.name} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">{f.name}</span>
                                {f.mapped ? (
                                    <span className="font-mono text-[10px] bg-blue-50 dark:bg-blue-950/40 text-[#1428A0] dark:text-blue-400 border border-blue-200 dark:border-blue-900 rounded px-2 py-0.5">
                                        ← {f.mapped}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] text-amber-500">
                                        <AlertTriangle size={11} /> Unmapped
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Summary bar */}
            <div className="bg-slate-800 dark:bg-slate-950 rounded-xl p-4 flex items-center justify-between">
                <p className="text-xs text-slate-300">
                    <span className="font-semibold text-white">{mockTargetFields.filter(f => f.mapped).length}</span> of{" "}
                    <span className="font-semibold text-white">{mockTargetFields.length}</span> fields mapped ·{" "}
                    {mockTargetFields.filter(f => !f.mapped).length > 0
                        ? <span className="text-amber-400">{mockTargetFields.filter(f => !f.mapped).length} unmapped field(s) will be skipped</span>
                        : <span className="text-emerald-400">All fields mapped ✓</span>}
                </p>
                <button
                    onClick={() => toast.loading("Running ingestion…", { description: "Processing 312 records" })}
                    className="px-4 py-1.5 rounded-lg bg-[#1428A0] text-white text-xs font-semibold hover:bg-[#0f1f85] transition"
                >
                    Run Ingestion →
                </button>
            </div>
        </div>
    );
}
