import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { Plus, Shield, UserCheck, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const roleStyle: Record<string, string> = {
    Admin: "bg-[#1428A0]/10 text-[#1428A0] dark:bg-blue-900/30 dark:text-blue-400",
    Analyst: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Viewer: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};
const tabs = ["User Management", "System Config", "SSO Integration"];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("User Management");

    return (
        <div className="p-6 space-y-6 max-w-[1100px] mx-auto bg-background">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">System administration & configuration</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1">
                {tabs.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                        className={cn(
                            "px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px",
                            activeTab === t
                                ? "text-[#1428A0] border-[#1428A0]"
                                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200"
                        )}
                    >{t}</button>
                ))}
            </div>

            {activeTab === "User Management" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Total Users", value: mockUsers.length, icon: <Shield size={16} className="text-[#1428A0]" /> },
                            { label: "Active", value: mockUsers.filter(u => u.status === "Active").length, icon: <UserCheck size={16} className="text-emerald-600" /> },
                            { label: "Inactive", value: mockUsers.filter(u => u.status === "Inactive").length, icon: <UserX size={16} className="text-slate-400" /> },
                        ].map(s => (
                            <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                                <div className="h-9 w-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">{s.icon}</div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Users</p>
                            <button
                                onClick={() => toast.info("User provisioning", { description: "SSO-linked user provisioning form will open here." })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1428A0] text-white text-xs font-semibold hover:bg-[#0f1f85] transition"
                            >
                                <Plus size={13} /> Provision User
                            </button>
                        </div>
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    {["Name", "Email", "Role", "Status", "Last Login", ""].map(h => (
                                        <th key={h} className="px-4 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {mockUsers.map(u => (
                                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                                        <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono">{u.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", roleStyle[u.role])}>{u.role}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={cn("flex items-center gap-1 w-fit text-[10px] font-semibold",
                                                u.status === "Active" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                                            )}>
                                                <span className={cn("h-1.5 w-1.5 rounded-full", u.status === "Active" ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600")} />
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-400 font-mono">{u.lastLogin}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toast.success(`${u.name} updated`)}
                                                className="text-xs text-slate-400 hover:text-[#1428A0] dark:hover:text-blue-400 transition px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab !== "User Management" && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-3 shadow-sm">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Shield size={22} className="text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Coming in Phase 2</p>
                    <p className="text-xs text-slate-400 max-w-xs">{activeTab} configuration will be available once the core backend is integrated.</p>
                </div>
            )}
        </div>
    );
}
