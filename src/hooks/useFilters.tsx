import { useState, useMemo } from "react";
import type { AnimalReport } from "../types/AnimalReport";

type StatusFilter = "Lost" | "Found" | "All";

interface UseFiltersReturn {
  statusFilter: StatusFilter;
  setStatusFilter: (v: StatusFilter) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  filteredReports: AnimalReport[];
  mapReports: AnimalReport[];
  availableTypes: string[];
}

export function useFilters(reports: AnimalReport[]): UseFiltersReturn {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Lost");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const availableTypes = useMemo(
    () => Array.from(new Set(reports.map((r) => r.animalType))),
    [reports]
  );

  const filteredReports = useMemo(
    () =>
      reports.filter((r) => {
        const statusMatch = statusFilter === "All" || r.status === statusFilter;
        const typeMatch = typeFilter === "All" || r.animalType === typeFilter;
        return statusMatch && typeMatch;
      }),
    [reports, statusFilter, typeFilter]
  );

  const mapReports = useMemo(
    () =>
      reports.filter((r) => {
        const statusMatch = statusFilter === "All" || r.status === statusFilter;
        const typeMatch = typeFilter === "All" || r.animalType === typeFilter;
        return statusMatch && typeMatch;
      }),
    [reports, statusFilter, typeFilter]
  );

  return {
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredReports,
    mapReports,
    availableTypes,
  };
}