import { useState } from "react";
import {
    useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
    flexRender, createColumnHelper, SortingState,
} from "@tanstack/react-table";
import { mockQualityRows, type QualityRow } from "@/data/mockData";
import { ArrowUpDown, Search, Filter, Download, Pencil, Trash2, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusStyle: Record<string, string> = {
    "Open": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "In Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Closed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const col = createColumnHelper<QualityRow>();

export default function OperationsPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const columns = [
        col.display({
            id: "select",
            header: ({ table }) => (
                <input type="checkbox" className="accent-[#1428A0] cursor-pointer"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input type="checkbox" className="accent-[#1428A0] cursor-pointer"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        }),
        col.accessor("id", { header: "Issue ID", cell: i => <span className="font-mono text-xs text-[#1428A0] dark:text-blue-400 font-semibold sticky left-0">{i.getValue()}</span> }),
        col.accessor("date", { header: "Date" }),
        col.accessor("line", { header: "Line" }),
        col.accessor("model", { header: "Model" }),
        col.accessor("defectType", { header: "Defect Type" }),
        col.accessor("qty", { header: "Qty" }),
        col.accessor("defectRate", { header: "Defect Rate" }),
        col.accessor("status", {
            header: "Status",
            cell: i => (
                <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", statusStyle[i.getValue()])}>
                    {i.getValue()}
                </span>
            ),
        }),
        col.accessor("assignee", { header: "Assignee" }),
        col.display({
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <button
                    onClick={() => toast.success(`Editing ${row.original.id}`, { description: "Inline edit mode active" })}
                    className="text-slate-400 hover:text-[#1428A0] dark:hover:text-blue-400 transition p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                    <Pencil size={13} />
                </button>
            ),
        }),
    ];

    const table = useReactTable({
        data: mockQualityRows,
        columns,
        state: { sorting, globalFilter, rowSelection },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div className="flex flex-col h-full overflow-auto bg-background">
            {/* Page header */}
            <div className="px-6 pt-5 pb-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Data Operations</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Quality Issue Registry · Click <Pencil size={10} className="inline" /> to edit a row
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5">
                            <Search size={13} className="text-slate-400" />
                            <input value={globalFilter} onChange={e => setGlobalFilter(e.target.value)}
                                placeholder="Search issues…"
                                className="bg-transparent text-xs outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 w-[160px]"
                            />
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <Filter size={13} /> Filter
                        </button>
                        <button
                            onClick={() => toast.success("Exported to CSV", { description: `${table.getRowModel().rows.length} rows exported` })}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                            <Download size={13} /> Export
                        </button>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
                        <div className="text-xs text-slate-400">{table.getRowModel().rows.length} rows</div>
                    </div>
                </div>
            </div>

            {/* Bulk action bar — appears when rows are selected */}
            {selectedCount > 0 && (
                <div className="flex items-center gap-4 px-6 py-2.5 bg-[#1428A0] text-white text-xs font-medium animate-in slide-in-from-top-1 duration-200">
                    <CheckSquare size={14} />
                    <span>{selectedCount} row{selectedCount > 1 ? "s" : ""} selected</span>
                    <div className="h-4 w-px bg-white/30" />
                    <button
                        onClick={() => { toast.success(`Status updated for ${selectedCount} rows`); setRowSelection({}); }}
                        className="hover:underline"
                    >
                        Mark as Closed
                    </button>
                    <button
                        onClick={() => { toast.error(`${selectedCount} rows deleted`); setRowSelection({}); }}
                        className="flex items-center gap-1 hover:underline text-red-200"
                    >
                        <Trash2 size={12} /> Delete
                    </button>
                    <button onClick={() => setRowSelection({})} className="ml-auto text-white/60 hover:text-white">
                        Clear
                    </button>
                </div>
            )}

            {/* Table card */}
            <div className="flex-1 overflow-auto px-6 py-5">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-xs">
                            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 z-10">
                                {table.getHeaderGroups().map(hg => (
                                    <tr key={hg.id}>
                                        {hg.headers.map(h => (
                                            <th key={h.id} onClick={h.column.getToggleSortingHandler()}
                                                className={cn(
                                                    "px-4 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap",
                                                    h.column.getCanSort() && "cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-1">
                                                    {flexRender(h.column.columnDef.header, h.getContext())}
                                                    {h.column.getCanSort() && <ArrowUpDown size={11} className="text-slate-400" />}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}
                                        className={cn(
                                            "hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors",
                                            row.getIsSelected() && "bg-blue-50 dark:bg-blue-950/30"
                                        )}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-4 py-2.5 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center text-[10px] text-slate-400 gap-4 shrink-0">
                        <span>Total {mockQualityRows.length} records</span>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <span>TanStack Table v8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
