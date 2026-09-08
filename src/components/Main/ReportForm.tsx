import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import type { SelectedLocation } from "./LeafletForm";
import type { AnimalType, KnownAnimalType } from "../../types";

const KNOWN_TYPES: KnownAnimalType[] = [
  "Dog",
  "Cat",
  "Hamster",
  "Bird",
  "Rabbit",
  "Other",
];

interface ReportFormProps {
  selectedLocation: SelectedLocation | null;
  onSubmit: (data: {
    animalName: string;
    animalType: AnimalType;
    description: string;
    email: string;
    phoneNum: string;
    password: string;
    photoFile: File;
  }) => Promise<void>; // Updated to expect an async function
}

function ReportForm({ selectedLocation, onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState({
    animalName: "",
    animalType: "" as KnownAnimalType | "",
    customAnimalType: "",
    description: "",
    email: "",
    phoneNum: "",
    password: "",
    photoFile: null as File | null,
  });

  // Track the loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOther = formData.animalType === "Other";

  // When "Other" is chosen, submit the custom text; otherwise submit the dropdown value
  const resolvedType: AnimalType | "" = isOther
    ? formData.customAnimalType.trim()
    : formData.animalType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Please click the map to select a last seen location.");
      return;
    }

    if (isOther && !formData.customAnimalType.trim()) {
      alert("Please specify the animal type.");
      return;
    }

    if (
      !formData.animalName.trim() ||
      !formData.animalType ||
      !formData.description.trim() ||
      !formData.email.trim() ||
      !formData.phoneNum.trim() ||
      !formData.password ||
      !formData.photoFile
    ) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    // Start the loading animation
    setIsSubmitting(true);

    try {
      // Await the submission task from the parent component
      await onSubmit({
        animalName: formData.animalName,
        animalType: resolvedType as AnimalType,
        description: formData.description,
        email: formData.email,
        phoneNum: formData.phoneNum,
        password: formData.password,
        photoFile: formData.photoFile,
      });
    } finally {
      // Stop the animation when done (or if an error occurs)
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="px-0">
      <h5 className="px-4 pt-3 mb-3 fw-bold">Submit a Report</h5>
      <Form className="py-2 px-4" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              placeholder="E.g. Cooper"
              value={formData.animalName}
              onChange={(e) =>
                setFormData({ ...formData, animalName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="animalType">
            <Form.Label>Animal Type</Form.Label>
            <Form.Select
              value={formData.animalType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  animalType: e.target.value as KnownAnimalType | "",
                  // Clear custom text when switching away from Other
                  customAnimalType:
                    e.target.value !== "Other" ? "" : formData.customAnimalType,
                })
              }
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              {KNOWN_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>

            {/* Revealed only when "Other" is selected */}
            {isOther && (
              <Form.Control
                className="mt-2"
                placeholder="E.g. Ferret, Turtle, Guinea pig…"
                value={formData.customAnimalType}
                onChange={(e) =>
                  setFormData({ ...formData, customAnimalType: e.target.value })
                }
                autoFocus
              />
            )}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Mention specific markings, collar color, last seen details..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                photoFile: e.target.files?.[0] ?? null,
              })
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="phoneNum">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={formData.phoneNum}
              onChange={(e) =>
                setFormData({ ...formData, phoneNum: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Last Seen Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="← Click on the map to select"
            value={selectedLocation?.label ?? ""}
            disabled
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Set a password to mark this report as found later"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>

        <Button 
          className="mb-3 w-100" 
          variant="danger" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default ReportForm;