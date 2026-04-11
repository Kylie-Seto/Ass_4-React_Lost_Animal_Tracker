import AnimalCard from "./AnimalCard";
import type { AnimalReport } from "../../types/AnimalReport";

interface ReportCardPanelProps {
  reports: AnimalReport[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ReportCardPanel({
  reports,
  selectedId,
  onSelect,
}: ReportCardPanelProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <p>No reports match your filters.</p>
      </div>
    );
  }

  return (
    <>
      {reports.map((report) => (
        <AnimalCard
          key={String(report.id)}
          id={String(report.id)}
          name={report.animalName}
          type={report.animalType}
          photoUrl={report.photoUrl?.thumb ?? ""}
          status={report.status}
          selected={String(report.id) === selectedId}
          onClick={onSelect}
        />
      ))}
    </>
  );
}