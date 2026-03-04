import { useState } from "react";
import {
    AreaChart, Area, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Activity } from "lucide-react";
import { mockKpiData, mockTrendData, mockCategoryData, mockAlerts } from "@/data/mockData";
import { cn } from "@/lib/utils";

const datePresets = ["This Month", "Last Quarter", "YTD", "Custom"];

function KpiCard({ label, value, change, positive }: typeof mockKpiData[0]) {
    const Icon = positive ? TrendingUp : TrendingDown;
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
            <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", positive ? "text-emerald-500" : "text-red-400")}>
                <Icon size={13} />
                <span>{change} vs. last period</span>
            </div>
        </div>
    );
}

const severityStyle: Record<string, string> = {
    high: "bg-red-100     text-red-700   border-red-200   dark:bg-red-900/30   dark:text-red-400   dark:border-red-800",
    medium: "bg-amber-100   text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
};

export default function DashboardPage() {
    const [activePreset, setActivePreset] = useState("This Month");

    return (
        <div className="p-6 space-y-6 max-w-[1100px] mx-auto bg-background">
            {/* Page title + Date Filter */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Executive Dashboard</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Quality Operations Overview · Global CS Team</p>
                </div>
                {/* Date preset filter — Dashboard only */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    {datePresets.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePreset(p)}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                activePreset === p
                                    ? "bg-[#1428A0] text-white shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            )}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {mockKpiData.map((d) => <KpiCard key={d.label} {...d} />)}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Trend chart */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Monthly Trend</p>
                            <p className="text-xs text-slate-400">Alerts · CS Tickets · Cost ($K) · {activePreset}</p>
                        </div>
                        <Activity size={16} className="text-slate-400" />
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={mockTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1428A0" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#1428A0" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="csGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.1} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                            <Area type="monotone" dataKey="alerts" name="QA Alerts" stroke="#1428A0" strokeWidth={2} fill="url(#alertGrad)" dot={{ r: 3, fill: "#1428A0" }} />
                            <Area type="monotone" dataKey="cs" name="CS Tickets" stroke="#10b981" strokeWidth={2} fill="url(#csGrad)" dot={{ r: 3, fill: "#10b981" }} />
                            <Bar dataKey="cost" name="Cost ($K)" fill="#e2e8f0" radius={[2, 2, 0, 0]} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">Defect Distribution</p>
                    <p className="text-xs text-slate-400 mb-4">By category · {activePreset}</p>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                                {mockCategoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <ul className="space-y-1.5 mt-2">
                        {mockCategoryData.map((c) => (
                            <li key={c.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full" style={{ background: c.fill }} />
                                    <span className="text-slate-600 dark:text-slate-400">{c.name}</span>
                                </div>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{c.value}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Alerts panel */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-slate-500 dark:text-slate-400" />
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Alerts</p>
                    </div>
                    <span className="text-xs font-medium text-[#1428A0] cursor-pointer hover:underline">View all</span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mockAlerts.map((a) => (
                        <li key={a.id} className="flex items-start gap-4 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                            <span className={cn(
                                "mt-0.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase border shrink-0",
                                severityStyle[a.severity]
                            )}>
                                {a.severity}
                            </span>
                            <p className="flex-1 text-xs text-slate-700 dark:text-slate-300">{a.message}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{a.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
