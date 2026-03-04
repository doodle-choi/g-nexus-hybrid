import { Search, Download, Lock, FileText, Database, FileSpreadsheet, FileJson, LayoutGrid, List, Folder, Info, Clock, User, ShieldCheck, Plus, X, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { mockLibraryData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formatIcon: Record<string, React.ReactNode> = {
    JSON: <FileJson size={18} className="text-blue-500" />,
    CSV: <Database size={18} className="text-emerald-500" />,
    Excel: <FileSpreadsheet size={18} className="text-green-600" />,
    Markdown: <FileText size={18} className="text-slate-500" />,
    PDF: <FileText size={18} className="text-red-500" />,
};

const categoryStyle: Record<string, string> = {
    "Raw Data": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    "Reported": "bg-[#1428A0]/10 text-[#1428A0] dark:bg-blue-900/30 dark:text-blue-400",
    "Template": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Processed Data": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

// Simple Tree Navigation component
function FolderTree({ selectedFolder, onSelect }: { selectedFolder: string | null, onSelect: (path: string) => void }) {
    const folders = [
        { name: "QA", children: ["2026 / Q1", "Master / 2026", "Samples"] },
        { name: "Finance", children: ["2026 / Global"] },
        { name: "System", children: ["Templates / CS"] },
        { name: "Executive", children: ["Board / 2025"] },
        { name: "Procurement", children: ["Suppliers / History"] },
    ];

    return (
        <div className="space-y-1">
            {folders.map(f => (
                <div key={f.name} className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-4 first:mt-0">
                        {f.name}
                    </div>
                    {f.children.map(child => {
                        const path = `${f.name} / ${child}`;
                        const isActive = selectedFolder === path;
                        return (
                            <button
                                key={path}
                                onClick={() => onSelect(isActive ? "" : path)}
                                className={cn(
                                    "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all text-left",
                                    isActive
                                        ? "bg-[#1428A0]/10 text-[#1428A0] dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <Folder size={14} className={isActive ? "text-[#1428A0] dark:text-blue-400" : "text-slate-400"} />
                                {child}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default function LibraryPage() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<"shelf" | "explorer">("shelf");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleAction = (item: typeof mockLibraryData[0]) => {
        if (item.hasAccess) {
            toast.success(`Downloading ${item.format} file…`, { description: item.title });
        } else {
            toast.info("Access Request Sent", {
                description: `Requested access to ${item.owner} for: ${item.title}`,
                duration: 4000
            });
        }
    };

    const filteredData = useMemo(() => {
        return mockLibraryData.filter(d => {
            const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFolder = !selectedFolder || d.folderPath === selectedFolder;
            return matchesSearch && matchesFolder;
        });
    }, [searchQuery, selectedFolder]);

    // Group by category for Shelf View
    const groupedData = useMemo(() => {
        const groups: Record<string, typeof mockLibraryData> = {};
        mockLibraryData.forEach(item => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        });
        return groups;
    }, []);

    return (
        <div className="flex h-full bg-background overflow-hidden relative">
            {/* Side Explorer (Left Rail) */}
            <aside className={cn(
                "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col overflow-hidden shrink-0",
                viewMode === "explorer" ? "w-[240px]" : "w-0 opacity-0 border-r-0"
            )}>
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <LayoutGrid size={16} className="text-[#1428A0]" /> Explorer
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <FolderTree selectedFolder={selectedFolder} onSelect={setSelectedFolder} />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Toolbar */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setViewMode("shelf")}
                                className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
                                    viewMode === "shelf" ? "bg-white dark:bg-slate-700 shadow-sm text-[#1428A0] dark:text-white font-bold" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                            >
                                <LayoutGrid size={14} /> Shelf
                            </button>
                            <button
                                onClick={() => setViewMode("explorer")}
                                className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
                                    viewMode === "explorer" ? "bg-white dark:bg-slate-700 shadow-sm text-[#1428A0] dark:text-white font-bold" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                            >
                                <List size={14} /> Explorer
                            </button>
                        </div>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1428A0] text-white text-xs font-semibold hover:bg-[#0f1f85] transition shadow-sm"
                        >
                            <Plus size={14} /> Upload Dataset
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 w-[260px]">
                            <Search size={14} className="text-slate-400" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search datasets, tags…"
                                className="bg-transparent text-xs outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrollable View Area */}
                <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-[1400px] mx-auto space-y-12">

                        {viewMode === "shelf" && (
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Data Library</h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Access raw/processed logs, templates, and strategic reports.</p>
                            </div>
                        )}

                        {/* Shelf View */}
                        {viewMode === "shelf" && (
                            Object.entries(groupedData).map(([category, items]) => (
                                <section key={category} className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                            <span className="h-4 w-1 bg-[#1428A0] rounded-full" />
                                            {category}
                                        </h2>
                                        <button className="text-xs text-[#1428A0] dark:text-blue-400 font-semibold hover:underline">View All</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {items.map(item => (
                                            <LibraryCard key={item.id} item={item} onAction={() => handleAction(item)} />
                                        ))}
                                    </div>
                                </section>
                            ))
                        )}

                        {/* Explorer View */}
                        {viewMode === "explorer" && (
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                                    <span>Items in {selectedFolder || "Root"}</span>
                                    <span>{filteredData.length} files</span>
                                </div>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 uppercase tracking-tight font-bold">
                                        <tr>
                                            <th className="px-6 py-3">File Name</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Format</th>
                                            <th className="px-6 py-3">Size</th>
                                            <th className="px-6 py-3">Updated</th>
                                            <th className="px-6 py-3 text-right">Access</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {filteredData.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                            {formatIcon[item.format]}
                                                        </div>
                                                        <div>
                                                            <p className={cn("font-semibold text-sm", item.hasAccess ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500")}>
                                                                {item.title}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{item.folderPath}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap", categoryStyle[item.category])}>
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{item.format}</td>
                                                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{item.size}</td>
                                                <td className="px-6 py-4 text-[11px] text-slate-400 font-mono">{item.updated}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleAction(item)}
                                                        className={cn(
                                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                                                            item.hasAccess
                                                                ? "bg-[#1428A0] text-white hover:bg-[#0f1f85] shadow-sm"
                                                                : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                                        )}
                                                    >
                                                        {item.hasAccess ? <Download size={13} /> : <Lock size={13} />}
                                                        {item.hasAccess ? "Get" : "Request"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <UploadModal
                    onClose={() => setShowUploadModal(false)}
                    onIngest={() => navigate("/ingestion")}
                />
            )}
        </div>
    );
}

function LibraryCard({ item, onAction }: { item: typeof mockLibraryData[0], onAction: () => void }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-0 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 flex flex-col relative overflow-hidden">
            {/* Header with Type Icon */}
            <div className="p-5 flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                    {formatIcon[item.format]}
                </div>
                <div className="flex items-center gap-2">
                    <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap", categoryStyle[item.category])}>
                        {item.category}
                    </span>
                    {!item.hasAccess && (
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <Lock size={14} />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-4 flex-1">
                <h3 className={cn("font-bold text-base mb-1.5 line-clamp-1 transition-colors",
                    item.hasAccess ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                )}>
                    {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed h-8 mb-4">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1"><User size={10} /> {item.owner}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.updated}</span>
                    </div>
                </div>

                <button
                    onClick={onAction}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95",
                        item.hasAccess
                            ? "bg-[#1428A0] text-white hover:bg-[#0f1f85] hover:shadow-lg hover:shadow-blue-500/20"
                            : "bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    )}
                >
                    {item.hasAccess ? <Download size={14} /> : <ShieldCheck size={14} />}
                    {item.hasAccess ? "Download" : "Request Access"}
                </button>
            </div>

            <div className={cn("h-1 w-full",
                item.category === "Raw Data" ? "bg-slate-400 dark:bg-slate-600" :
                    item.category === "Reported" ? "bg-[#1428A0]" :
                        item.category === "Processed Data" ? "bg-emerald-500" : "bg-purple-400"
            )} />
        </div>
    );
}

function UploadModal({ onClose, onIngest }: { onClose: () => void, onIngest: () => void }) {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState<string>("Reported");

    const categories = [
        { id: "Reported", label: "Final Report", desc: "PDF/Excel for direct publishing", icon: <FileText size={18} /> },
        { id: "Template", label: "System Template", desc: "Ingestion guides & forms", icon: <FileSpreadsheet size={18} /> },
        { id: "Raw Data", label: "Raw Dataset", desc: "JSON/CSV requiring mapping", icon: <Database size={18} /> },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800 dark:text-white">Upload New Dataset</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Step 1: Category Selection */}
                {step === 1 && (
                    <div className="p-6 space-y-6">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">Step 1: Choose Dataset Type</p>
                        <div className="space-y-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                                        category === cat.id
                                            ? "border-[#1428A0] bg-blue-50/50 dark:bg-blue-900/20 ring-1 ring-[#1428A0]"
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                                    )}
                                >
                                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                                        category === cat.id ? "bg-[#1428A0] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400")}>
                                        {cat.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn("text-sm font-bold", category === cat.id ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300")}>{cat.label}</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{cat.desc}</p>
                                    </div>
                                    {category === cat.id && <CheckCircle2 size={18} className="text-[#1428A0]" />}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 bg-[#1428A0] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#0f1f85] transition-all flex items-center justify-center gap-2"
                        >
                            Next Step <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {/* Step 2: File Upload */}
                {step === 2 && (
                    <div className="p-6 space-y-6">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">Step 2: Upload Files</p>

                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/30 group hover:border-[#1428A0]/50 transition-colors cursor-pointer">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-[#1428A0]/10 transition-colors">
                                <Upload size={22} className="text-slate-400 group-hover:text-[#1428A0]" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Click or drag file to this area</p>
                            <p className="text-[11px] text-slate-400 mt-1">Supports JSON, CSV, PDF, Markdown</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setStep(1)} className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                                    Back
                                </button>
                                {category === "Raw Data" ? (
                                    <button
                                        onClick={() => { onClose(); onIngest(); }}
                                        className="py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                                    >
                                        Proceed to Ingestion <ArrowRight size={14} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { toast.success("Resource successfully published!"); onClose(); }}
                                        className="py-2.5 rounded-xl bg-[#1428A0] text-white text-xs font-bold hover:bg-[#0f1f85] transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        Publish to Library
                                    </button>
                                )}
                            </div>
                            {category === "Raw Data" && (
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg flex gap-3">
                                    <Info size={16} className="text-[#1428A0] shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal">
                                        Raw datasets require field mapping and validation before being available for analysis. We will redirect you to the <b>Data Ingestion</b> pipeline.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
