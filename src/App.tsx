import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import SubmitReportPage from "./pages/SubmitReportPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Home goes directly to map view */}
          <Route path="/" element={<Navigate to="/mapView" replace />} />
          <Route path="/mapView" element={<Dashboard />} />
          <Route path="/submitReport" element={<SubmitReportPage />} />
          <Route path="/report/:id" element={<ReportDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
