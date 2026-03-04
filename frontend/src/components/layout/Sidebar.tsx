import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Table2, Upload, GitMerge, Library,
    Settings, ChevronLeft, ChevronRight,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Data Operations", icon: Table2, to: "/operations" },
    { label: "Data Ingestion", icon: Upload, to: "/ingestion" },
    { label: "Data Mapping", icon: GitMerge, to: "/mapping" },
    { label: "Data Library", icon: Library, to: "/library" },
];
const bottomItems = [
    { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const w = collapsed ? "w-[64px]" : "w-[240px]";

    return (
        <aside className={cn(
            "flex flex-col h-full bg-slate-900 dark:bg-slate-950 border-r border-slate-800 transition-all duration-200 shrink-0",
            w
        )}>
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-slate-800 gap-3 overflow-hidden">
                <div className="shrink-0 h-8 w-8 rounded-md bg-[#1428A0] flex items-center justify-center">
                    <span className="text-white font-black text-sm">G</span>
                </div>
                {!collapsed && (
                    <span className="text-white font-bold text-base tracking-tight whitespace-nowrap">G-Nexus</span>
                )}
            </div>

            {/* Main nav */}
            <nav className="flex-1 py-4 space-y-1 px-2 overflow-hidden">
                {navItems.map(({ label, icon: Icon, to }) => (
                    <NavLink key={to} to={to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            isActive
                                ? "bg-[#1428A0] text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                        )}
                    >
                        <Icon size={18} className="shrink-0" />
                        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom nav */}
            <div className="border-t border-slate-800 py-4 px-2 space-y-1">
                {bottomItems.map(({ label, icon: Icon, to }) => (
                    <NavLink key={to} to={to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            isActive ? "bg-[#1428A0] text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                        )}
                    >
                        <Icon size={18} className="shrink-0" />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-all text-sm"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    {!collapsed && <span>Collapse</span>}
                </button>
                {!collapsed && (
                    <p className="text-slate-700 text-[10px] px-3 pt-1 whitespace-nowrap">G-Nexus v0.1.0-poc</p>
                )}
            </div>
        </aside>
    );
}
