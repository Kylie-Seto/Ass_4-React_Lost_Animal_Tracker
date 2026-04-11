import { type UUIDTypes } from "uuid";
import type { AnimalType, ReportStatus } from "../types/index";

// On successful submission, the report is written to JSONbin.io as part of a shared reports array
export interface AnimalReport {
  id: UUIDTypes; // incremented upon each published report
  animalName: string;
  animalType: AnimalType;
  photoUrl: { full: string; thumb: string }; // The photo must be uploaded to ImgBB (https://api.imgbb.com) and the returned hosted URL stored as part of the report — do not store raw image data in JSONbin
  description: string;
  email: string;
  phoneNum: string;
  lat: number; // not a field dispalyed on the form, but coordinates grabbed from leaflet
  lng: number; // not a field dispalyed on the form, but coordinates grabbed from leaflet
  address: string; // reverse-geocoded into human-readable adddress using Nominatim API (https://nominatim.openstreetmap.org) and displayed back to the user before submission
  status: ReportStatus;
  passwordHash: string; // The password must never be stored in plaintext — you must hash it using the browser's built-in crypto.subtle.digest("SHA-256", ...) before persisting
  createdAt: string; //newdate to functoion?
}
