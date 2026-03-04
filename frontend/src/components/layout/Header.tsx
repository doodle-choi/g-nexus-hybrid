import { useLocation } from "react-router-dom";
import { Bell, Search, User, Moon, Sun, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAlerts } from "@/data/mockData";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

const breadcrumbMap: Record<string, string[]> = {
    "/dashboard": ["G-Nexus", "Dashboard"],
    "/operations": ["G-Nexus", "Data Operations"],
    "/ingestion": ["G-Nexus", "Data Ingestion"],
    "/mapping": ["G-Nexus", "Data Mapping"],
    "/library": ["G-Nexus", "Data Library"],
    "/settings": ["G-Nexus", "Settings"],
};

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const crumbs = breadcrumbMap[location.pathname] ?? ["G-Nexus"];
    const [notifOpen, setNotifOpen] = useState(false);
    const highCount = mockAlerts.filter((a) => a.severity === "high").length;

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4 shrink-0 z-20">
            {/* Left: Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm">
                {crumbs.map((c, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight size={13} className="text-slate-400 dark:text-slate-600" />}
                        <span className={cn(
                            i === crumbs.length - 1
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-400 dark:text-slate-500 font-medium"
                        )}>
                            {c}
                        </span>
                    </span>
                ))}
            </nav>

            {/* Center: Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition w-[240px]">
                <Search size={14} />
                <span className="flex-1 text-xs">Search or press</span>
                <kbd className="text-[10px] border border-slate-300 dark:border-slate-600 rounded px-1 text-slate-400 font-mono">⌘K</kbd>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Notification bell */}
                <div className="relative">
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className={cn(
                            "relative h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 transition",
                            notifOpen ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        <Bell size={18} />
                        {highCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-[7px] w-[7px] rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                        )}
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 top-11 w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notifications</p>
                                <span className="text-xs text-slate-400">{mockAlerts.length} new</span>
                            </div>
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[280px] overflow-y-auto">
                                {mockAlerts.map((a) => (
                                    <li key={a.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
                                        <div className="flex items-start gap-3">
                                            <span className={cn("mt-1 h-2 w-2 rounded-full shrink-0",
                                                a.severity === "high" && "bg-red-500",
                                                a.severity === "medium" && "bg-amber-400",
                                                a.severity === "low" && "bg-emerald-400"
                                            )} />
                                            <div>
                                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">{a.message}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* User profile */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5 transition">
                    <div className="h-7 w-7 rounded-full bg-[#1428A0] flex items-center justify-center">
                        <User size={13} className="text-white" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-none">Kim, Jeonghun</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Admin</p>
                    </div>
                    <ChevronDown size={13} className="text-slate-400 hidden md:block" />
                </div>
            </div>
        </header>
    );
}
