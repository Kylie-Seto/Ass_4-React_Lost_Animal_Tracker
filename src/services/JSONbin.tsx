// Implement the JSONbin service with functions to read and write the reports array

//import { useState, useEffect } from "react";
import type { AnimalReport } from "../types/AnimalReport";

const KEY = import.meta.env.VITE_JSONBIN_KEY as string;
const BIN_ID = import.meta.env.VITE_BIN_ID as string;
const BASE = "https://api.jsonbin.io/v3";

if (!KEY) throw new Error("VITE_JSONBIN_KEY is not set in .env");
if (!BIN_ID) throw new Error("VITE_BIN_ID is not set in .env");

// read from JSONbin
export async function readBin(): Promise<AnimalReport[]> {
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    headers: { "X-Master-Key": KEY },
  });
  if (!res.ok) throw new Error(`Read failed: ${res.status}`); // error handling for unsuccessful read
  const json = await res.json();
  // actual data is always stored in json.record
  return json.record.reports ?? []; // ?? = only returns [] if values is null or undefined
}

// write to JSONbin
export async function writeBin(reports: AnimalReport[]): Promise<AnimalReport[]> {
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": KEY,
    },
    body: JSON.stringify({ reports }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      `Write failed: ${res.status} - ${errData.message || res.statusText}`,
    );
  }
  const json = await res.json();
  return json.record.reports ?? [];
}

