import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

// TEMPORARY TEST — delete this before Phase 2
//import { readBin, writeBin } from "./services/JSONbin.tsx";

// This runs once when the app loads.
// Open DevTools > Console to see the output.
// readBin()
//   .then((reports) => {
//     console.log("Current reports:", reports);

//     // Now try writing a mock report
//     const mockReport = {
//       id: 1,
//       animalName: "Biscuit",
//       animalType: "Dog" as const, // "as const" tells TypeScript this is the literal type "Dog"
//       photoUrl: "https://example.com/biscuit.jpg",
//       description: "Golden retriever, very friendly",
//       contactInfo: "555-1234",
//       lastSeenLat: 49.2761,
//       lastSeenLon: -122.9162,
//       lastSeenAddress: "SFU Burnaby Campus",
//       status: "Lost" as const,
//       passwordHash: "fakehashfornowtesting",
//       createdAt: new Date().toISOString(),
//     };

//     return writeBin([...reports, mockReport]);
//   })
//   .then((saved) => console.log("Saved reports:", saved))
//   .catch((err) => console.error("JSONbin error:", err));
