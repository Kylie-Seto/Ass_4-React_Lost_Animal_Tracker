import { useState, useEffect, useCallback } from "react";
import { readBin, writeBin } from "../services/JSONbin";
import type { AnimalReport } from "../types/AnimalReport";

interface UseReportsReturn {
  reports: AnimalReport[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateReport: (updated: AnimalReport) => Promise<void>;
}

export function useReports(): UseReportsReturn {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await readBin();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const updateReport = useCallback(
    async (updated: AnimalReport) => {
      const next = reports.map((r) =>
        String(r.id) === String(updated.id) ? updated : r
      );
      await writeBin(next);
      setReports(next);
    },
    [reports]
  );

  return { reports, loading, error, refresh: fetchReports, updateReport };
}