// Mock data for all Phase 1.5 views

export const mockKpiData = [
    { label: "Total QA Alerts", value: "124", change: "+12%", positive: true },
    { label: "Open Issues", value: "37", change: "-5%", positive: true },
    { label: "CS Response Rate", value: "96.2%", change: "+1.4%", positive: true },
    { label: "Cost Variance", value: "$14.2K", change: "+8.1%", positive: false },
];

export const mockTrendData = [
    { month: "Sep", alerts: 98, cost: 142, cs: 211 },
    { month: "Oct", alerts: 115, cost: 158, cs: 198 },
    { month: "Nov", alerts: 107, cost: 134, cs: 224 },
    { month: "Dec", alerts: 132, cost: 167, cs: 240 },
    { month: "Jan", alerts: 119, cost: 145, cs: 218 },
    { month: "Feb", alerts: 124, cost: 152, cs: 229 },
];

export const mockCategoryData = [
    { name: "Soldering Defect", value: 34, fill: "#1428A0" },
    { name: "Missing Component", value: 28, fill: "#4a5f9e" },
    { name: "Cosmetic Damage", value: 22, fill: "#7b8fc4" },
    { name: "Functional Failure", value: 16, fill: "#b0beef" },
    { name: "Other", value: 10, fill: "#e0e5f7" },
];

export const mockAlerts = [
    { id: 1, severity: "high", message: "Soldering defect rate exceeded threshold (>3.5%)", time: "10 min ago" },
    { id: 2, severity: "medium", message: "CS ticket volumes up 14% vs. last week", time: "42 min ago" },
    { id: 3, severity: "low", message: "Monthly cost variance within acceptable range", time: "2 hrs ago" },
    { id: 4, severity: "high", message: "Missing component batch — line B4 quarantined", time: "3 hrs ago" },
];

export type QualityRow = {
    id: string;
    date: string;
    line: string;
    model: string;
    defectType: string;
    qty: number;
    defectRate: string;
    status: "Open" | "In Review" | "Closed";
    assignee: string;
};

export const mockQualityRows: QualityRow[] = [
    { id: "QA-0041", date: "2026-02-28", line: "B1", model: "Galaxy S25", defectType: "Soldering Defect", qty: 8, defectRate: "3.2%", status: "Open", assignee: "Kim, J." },
    { id: "QA-0040", date: "2026-02-28", line: "B3", model: "Galaxy Z6", defectType: "Missing Component", qty: 5, defectRate: "2.0%", status: "In Review", assignee: "Lee, H." },
    { id: "QA-0039", date: "2026-02-27", line: "B2", model: "Galaxy S25", defectType: "Cosmetic Damage", qty: 12, defectRate: "4.8%", status: "Closed", assignee: "Park, S." },
    { id: "QA-0038", date: "2026-02-27", line: "B4", model: "Tab S10", defectType: "Functional Failure", qty: 3, defectRate: "1.2%", status: "Open", assignee: "Choi, M." },
    { id: "QA-0037", date: "2026-02-26", line: "B1", model: "Galaxy S25", defectType: "Soldering Defect", qty: 6, defectRate: "2.4%", status: "In Review", assignee: "Kim, J." },
    { id: "QA-0036", date: "2026-02-26", line: "B2", model: "Galaxy Z6", defectType: "Missing Component", qty: 4, defectRate: "1.6%", status: "Closed", assignee: "Lee, H." },
    { id: "QA-0035", date: "2026-02-25", line: "B3", model: "Tab S10", defectType: "Cosmetic Damage", qty: 9, defectRate: "3.6%", status: "Open", assignee: "Park, S." },
    { id: "QA-0034", date: "2026-02-25", line: "B4", model: "Galaxy S25", defectType: "Functional Failure", qty: 2, defectRate: "0.8%", status: "Closed", assignee: "Choi, M." },
    { id: "QA-0033", date: "2026-02-24", line: "B1", model: "Galaxy Z6", defectType: "Soldering Defect", qty: 11, defectRate: "4.4%", status: "In Review", assignee: "Kim, J." },
    { id: "QA-0032", date: "2026-02-24", line: "B2", model: "Tab S10", defectType: "Missing Component", qty: 7, defectRate: "2.8%", status: "Open", assignee: "Lee, H." },
];

export const mockIngestionHistory = [
    { id: 1, filename: "qa_report_feb_2026.json", size: "428 KB", status: "Completed", uploaded: "2026-02-28 09:12", records: 312 },
    { id: 2, filename: "cost_data_q1_2026.md", size: "185 KB", status: "Completed", uploaded: "2026-02-27 14:30", records: 98 },
    { id: 3, filename: "cs_tickets_weekly.json", size: "64 KB", status: "Pending", uploaded: "2026-02-28 11:45", records: 0 },
    { id: 4, filename: "qa_report_jan_2026.json", size: "391 KB", status: "Completed", uploaded: "2026-01-31 10:05", records: 287 },
    { id: 5, filename: "cost_summary_2025_q4.md", size: "210 KB", status: "Failed", uploaded: "2026-01-15 16:22", records: 0 },
];

export const mockSourceFields = [
    "report_date", "production_line", "product_model", "defect_category",
    "defect_quantity", "total_inspected", "inspector_id", "shift", "notes",
];

export const mockTargetFields = [
    { name: "date", mapped: "report_date" },
    { name: "line", mapped: "production_line" },
    { name: "model", mapped: "product_model" },
    { name: "defectType", mapped: "defect_category" },
    { name: "qty", mapped: "defect_quantity" },
    { name: "total", mapped: "total_inspected" },
    { name: "assignee", mapped: null },
];

export const mockUsers = [
    { id: "u-001", name: "Kim, Jeonghun", email: "j.kim@globalcs.com", role: "Admin", status: "Active", lastLogin: "2026-03-04" },
    { id: "u-002", name: "Lee, Hyunsu", email: "h.lee@globalcs.com", role: "Analyst", status: "Active", lastLogin: "2026-03-04" },
    { id: "u-003", name: "Park, Soyeon", email: "s.park@globalcs.com", role: "Viewer", status: "Active", lastLogin: "2026-03-03" },
    { id: "u-004", name: "Choi, Minwoo", email: "m.choi@globalcs.com", role: "Analyst", status: "Active", lastLogin: "2026-03-02" },
    { id: "u-005", name: "Jung, Eunji", email: "e.jung@globalcs.com", role: "Viewer", status: "Inactive", lastLogin: "2026-02-14" },
];

export const mockLibraryData = [
    {
        id: "lib-01",
        title: "2026 Q1 Quality Audit Logs",
        description: "Raw defect and inspection logs directly from the factory floors.",
        category: "Raw Data",
        folderPath: "QA / 2026 / Q1",
        format: "JSON",
        size: "14.2 MB",
        updated: "2026-03-01",
        owner: "QA Team",
        tags: ["Production", "Defects", "Q1"],
        hasAccess: true,
    },
    {
        id: "lib-02",
        title: "Global Cost Variance Report",
        description: "Aggregated monthly cost variance including material and labor.",
        category: "Reported",
        folderPath: "Finance / 2026 / Global",
        format: "CSV",
        size: "2.4 MB",
        updated: "2026-02-28",
        owner: "Finance",
        tags: ["Cost", "Monthly", "Executive"],
        hasAccess: false,
    },
    {
        id: "lib-03",
        title: "CS Ticket Ingestion Template",
        description: "Standard template for uploading manual or third-party CS ticket data.",
        category: "Template",
        folderPath: "System / Templates / CS",
        format: "Excel",
        size: "45 KB",
        updated: "2025-12-15",
        owner: "System Admin",
        tags: ["Template", "CS", "Ingestion"],
        hasAccess: true,
    },
    {
        id: "lib-04",
        title: "Supplier Material Defect History",
        description: "Converted markdown tables containing text-heavy supplier diagnostic notes.",
        category: "Raw Data",
        folderPath: "Procurement / Suppliers / History",
        format: "Markdown",
        size: "8.1 MB",
        updated: "2026-02-25",
        owner: "Procurement",
        tags: ["Suppliers", "Diagnostics"],
        hasAccess: true,
    },
    {
        id: "lib-05",
        title: "2025 Annual Quality Board Review",
        description: "Highly confidential board slide deck and underlying data tables.",
        category: "Reported",
        folderPath: "Executive / Board / 2025",
        format: "PDF",
        size: "32 MB",
        updated: "2026-01-10",
        owner: "VP of Quality",
        tags: ["Annual", "Confidential", "Board"],
        hasAccess: false,
    },
    {
        id: "lib-06",
        title: "B1 Line Production Sample",
        description: "Sample production data for B1 line (Galaxy S25) for testing ingestion.",
        category: "Template",
        folderPath: "QA / Samples",
        format: "CSV",
        size: "1.2 MB",
        updated: "2026-02-20",
        owner: "QA Team",
        tags: ["Sample", "Line B1"],
        hasAccess: true,
    },
    {
        id: "lib-07",
        title: "Standardized QA Master Data",
        description: "Processed and cleaned master dataset ready for BI reporting.",
        category: "Processed Data",
        folderPath: "QA / Master / 2026",
        format: "JSON",
        size: "8.8 MB",
        updated: "2026-03-04",
        owner: "System",
        tags: ["Master", "BI-Ready"],
        hasAccess: true,
    },
];
