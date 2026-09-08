import { useReports } from "../hooks/useReports";
import { useFilters } from "../hooks/useFilters";
import { useState } from "react";
import ReportCardPanel from "../components/Main/ReportCardPanel";
import Filters from "../components/Main/Filters";
import LeafletView from "../components/Main/LeafletView";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function Dashboard() {
  const { reports, loading, error } = useReports();
  const {
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredReports,
    mapReports,
    availableTypes,
  } = useFilters(reports);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <Spinner animation="border" variant="danger" />
        <span className="ms-3 text-muted">Loading reports…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="danger">
          <Alert.Heading>Failed to load reports</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "calc(100vh - 56px)" }}>
      {/* Full-screen map */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <LeafletView
          report={mapReports}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Overlay panel — right 1/3 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(300px, 33%, 420px)",
          height: "100%",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          background: "rgba(255,255,255,0.97)",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.12)",
          borderLeft: "1px solid #e8e8e8",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding: "16px 16px 12px",
            borderBottom: "1px solid #eee",
            background: "#fff",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "10px",
              color: "#222",
            }}
          >
            {filteredReports.length} report
            {filteredReports.length !== 1 ? "s" : ""}
          </div>
          <Filters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            types={availableTypes}
          />
        </div>

        {/* Scrollable card list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          <ReportCardPanel
            reports={filteredReports}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
}
