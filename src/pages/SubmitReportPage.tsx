// SubmitReportPage that combines leaflet map + report form and submits to jsonbin.io

import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeafletForm, { type SelectedLocation } from "../components/Main/LeafletForm";
import ReportForm from "../components/Main/ReportForm";
import { writeBin, readBin } from "../services/JSONbin";
import type { AnimalReport } from "../types/AnimalReport";
import { v4 as uuidv4 } from "uuid";
import { uploadImg } from "../services/ImgBB";
import { hashPassword } from "../services/HashPassword";
import type { AnimalType } from "../types";

export default function SubmitReportPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(formData: {
    animalName: string;
    animalType: AnimalType;
    description: string;
    email: string;
    phoneNum: string;
    password: string;
    photoFile: File;
  }) {
    if (!selectedLocation) return;

    try {
      const [photoUrl, passwordHash] = await Promise.all([
        uploadImg(formData.photoFile),
        hashPassword(formData.password),
      ]);

      const newReport: AnimalReport = {
        id: uuidv4(),
        animalName: formData.animalName,
        animalType: formData.animalType,
        description: formData.description,
        email: formData.email,
        phoneNum: formData.phoneNum,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address: selectedLocation.label,
        photoUrl: { full: photoUrl.full, thumb: photoUrl.thumb },
        status: "Lost",
        passwordHash, // SHA-256 hash — never plaintext
        createdAt: new Date().toISOString(),
      };

      const existingReports = await readBin();
      await writeBin([...existingReports, newReport]);

      alert("Report submitted successfully!");
      navigate("/mapView");
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? `Submission failed: ${err.message}`
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Row className="g-0">
      <Col md={6}>
        <LeafletForm onLocationSelect={setSelectedLocation} />
      </Col>
      <Col md={6} style={{ overflowY: "auto", maxHeight: "calc(100vh - 56px)" }}>
        <ReportForm
          selectedLocation={selectedLocation}
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
}