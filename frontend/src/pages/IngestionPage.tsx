import { useState } from "react";
import { Upload, CheckCircle, XCircle, Clock, FileJson, FileText, Trash2 } from "lucide-react";
import { mockIngestionHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusIcon: Record<string, React.ReactNode> = {
    Completed: <CheckCircle size={13} className="text-emerald-500" />,
    Pending: <Clock size={13} className="text-amber-500" />,
    Failed: <XCircle size={13} className="text-red-500" />,
};
const statusStyle: Record<string, string> = {
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending: "bg-amber-100   text-amber-700   dark:bg-amber-900/30   dark:text-amber-400",
    Failed: "bg-red-100     text-red-700     dark:bg-red-900/30     dark:text-red-400",
};

export default function IngestionPage() {
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            toast.success(`"${files[0].name}" uploaded successfully`, { description: "Validation in progress…" });
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-[1200px] mx-auto bg-background">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Data Ingestion</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Upload JSON or Markdown data files for processing</p>
            </div>

            {/* Drop Zone */}
            <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={cn(
                    "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all gap-4 cursor-pointer",
                    dragging
                        ? "border-[#1428A0] bg-blue-50 dark:bg-blue-950/30"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
            >
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-all",
                    dragging ? "bg-[#1428A0]" : "bg-slate-100 dark:bg-slate-800"
                )}>
                    <Upload size={28} className={dragging ? "text-white" : "text-slate-400 dark:text-slate-500"} />
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {dragging ? "Drop file to upload" : "Drag & drop files here"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        Supports: <span className="font-mono">.json</span> · <span className="font-mono">.md</span> · <span className="font-mono">.markdown</span> (max 50 MB)
                    </p>
                </div>
                <button
                    onClick={() => toast.info("File browser opening…", { description: "Select your data file to upload." })}
                    className="px-5 py-2 rounded-lg bg-[#1428A0] text-white text-xs font-semibold hover:bg-[#0f1f85] transition"
                >
                    Browse Files
                </button>
            </div>

            {/* Format cards */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { icon: <FileJson size={20} className="text-[#1428A0]" />, title: "JSON Format", desc: "Structured QA reports, cost breakdown, CS ticket exports with standard or custom keys." },
                    { icon: <FileText size={20} className="text-slate-600 dark:text-slate-400" />, title: "Markdown Format", desc: "Table-to-Markdown converted documents from external pre-processing pipelines." },
                ].map(f => (
                    <div key={f.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 shadow-sm">
                        <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">{f.icon}</div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{f.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* History */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Ingestion History</p>
                </div>
                <table className="w-full text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            {["Filename", "Size", "Records", "Status", "Uploaded", ""].map(h => (
                                <th key={h} className="px-4 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mockIngestionHistory.map(row => (
                            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                                <td className="px-4 py-3 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-mono">
                                    {row.filename.endsWith(".json")
                                        ? <FileJson size={13} className="text-[#1428A0]" />
                                        : <FileText size={13} className="text-slate-500" />}
                                    {row.filename}
                                </td>
                                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.size}</td>
                                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{row.records > 0 ? row.records : "—"}</td>
                                <td className="px-4 py-3">
                                    <span className={cn("flex items-center gap-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-semibold", statusStyle[row.status])}>
                                        {statusIcon[row.status]} {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-slate-400 font-mono">{row.uploaded}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => toast.error("File deleted", { description: row.filename })}
                                        className="text-slate-300 dark:text-slate-600 hover:text-red-400 transition p-1 rounded"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
