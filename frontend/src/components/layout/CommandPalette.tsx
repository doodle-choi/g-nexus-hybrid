import { useEffect, useState } from "react";
import { Search, X, LayoutDashboard, Table2, Upload, GitMerge, Settings, Library } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const commands = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Data Operations", icon: Table2, to: "/operations" },
    { label: "Data Ingestion", icon: Upload, to: "/ingestion" },
    { label: "Data Mapping", icon: GitMerge, to: "/mapping" },
    { label: "Data Library", icon: Library, to: "/library" },
    { label: "Settings", icon: Settings, to: "/settings" },
];

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const filtered = commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
    );

    const go = (to: string) => {
        navigate(to);
        setOpen(false);
        setQuery("");
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                    <Search size={16} className="text-slate-400 shrink-0" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search pages, metrics, actions…"
                        className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
                    />
                    <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                        <X size={14} />
                    </button>
                </div>

                {/* Results */}
                <ul className="py-2 max-h-[300px] overflow-y-auto">
                    {filtered.length === 0 && (
                        <li className="px-4 py-6 text-center text-sm text-slate-400">No results found.</li>
                    )}
                    {filtered.map((c) => (
                        <li key={c.to}>
                            <button
                                onClick={() => go(c.to)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left",
                                    "hover:bg-slate-50 transition text-slate-700"
                                )}
                            >
                                <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                    <c.icon size={14} className="text-slate-500" />
                                </div>
                                {c.label}
                                <span className="ml-auto text-[10px] text-slate-300 font-mono">Navigate</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-400">
                    <span><kbd className="border border-slate-200 rounded px-1 font-mono">↑↓</kbd> navigate</span>
                    <span><kbd className="border border-slate-200 rounded px-1 font-mono">↵</kbd> open</span>
                    <span><kbd className="border border-slate-200 rounded px-1 font-mono">Esc</kbd> close</span>
                </div>
            </div>
        </div>
    );
}
