import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/Dashboard";
import OperationsPage from "./pages/OperationsPage";
import IngestionPage from "./pages/IngestionPage";
import MappingPage from "./pages/MappingPage";
import SettingsPage from "./pages/SettingsPage";
import LibraryPage from "./pages/LibraryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* App shell with shared layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/ingestion" element={<IngestionPage />} />
          <Route path="/mapping" element={<MappingPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
