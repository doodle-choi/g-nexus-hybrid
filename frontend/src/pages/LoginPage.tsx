import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const ASCII_LOGO = `
██████╗  ██╗      ██████╗ ██████╗  █████╗ ██╗     
██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     
██║  ███╗██║     ██║   ██║██████╔╝███████║██║     
██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     
╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

 ██████╗███████╗    ████████╗███████╗ █████╗ ███╗   ███╗
██╔════╝██╔════╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
██║     ███████╗       ██║   █████╗  ███████║██╔████╔██║
██║     ╚════██║       ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
╚██████╗███████║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║
 ╚═════╝╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
`.trim();

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setLoading(true);
        // Mock auth: accept any non-empty credentials
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 900);
    };

    return (
        <div className="min-h-screen flex bg-slate-950">
            {/* LEFT: Branding panel */}
            <div className="hidden lg:flex flex-col justify-between w-[55%] bg-[#0e1a6e] p-12 relative overflow-hidden">
                {/* Background grid overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                            <span className="text-[#1428A0] font-black text-lg">G</span>
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tight">G-Nexus</span>
                    </div>
                    <pre className="text-[#7b8fc4] text-[9px] leading-tight font-mono select-none whitespace-pre">
                        {ASCII_LOGO}
                    </pre>
                </div>
                <div className="relative z-10 space-y-6">
                    {[
                        { icon: "⬡", title: "Unified Data Ingestion", desc: "JSON, Markdown, and structured report formats" },
                        { icon: "◈", title: "Real-time QA Intelligence", desc: "Anomaly detection & trend forecasting" },
                        { icon: "⊕", title: "Enterprise-grade Security", desc: "JWT auth with SSO-ready provisioning" },
                    ].map((f) => (
                        <div key={f.title} className="flex items-start gap-4">
                            <span className="text-[#4a6fd4] text-xl mt-0.5">{f.icon}</span>
                            <div>
                                <p className="text-white font-semibold text-sm">{f.title}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Login form */}
            <div className="flex flex-1 flex-col justify-center items-center px-8 py-12">
                {/* Mobile logo */}
                <div className="lg:hidden flex items-center gap-2 mb-10">
                    <div className="h-9 w-9 rounded-lg bg-[#1428A0] flex items-center justify-center">
                        <span className="text-white font-black text-base">G</span>
                    </div>
                    <span className="text-white font-bold text-xl">G-Nexus</span>
                </div>

                <div className="w-full max-w-[400px] space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                        <p className="text-slate-400 text-sm mt-1">Sign in to G-Nexus Quality Operations</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-slate-300 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@globalcs.com"
                                className={cn(
                                    "w-full bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500",
                                    "rounded-lg px-4 py-2.5 text-sm outline-none transition",
                                    "focus:border-[#1428A0] focus:ring-2 focus:ring-[#1428A0]/30"
                                )}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-slate-300 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={cn(
                                    "w-full bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500",
                                    "rounded-lg px-4 py-2.5 text-sm outline-none transition",
                                    "focus:border-[#1428A0] focus:ring-2 focus:ring-[#1428A0]/30"
                                )}
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all",
                                "bg-[#1428A0] hover:bg-[#0f1f85] active:scale-[0.98]",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 text-xs">
                        Account access is managed by your administrator.
                    </p>
                    <div className="pt-4 border-t border-slate-800 text-center">
                        <p className="text-slate-600 text-xs">G-Nexus v0.1.0-poc · Global CS Team</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
