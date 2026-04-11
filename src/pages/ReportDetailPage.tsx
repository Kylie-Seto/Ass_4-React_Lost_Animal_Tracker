import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReports } from "../hooks/useReports";
import { verifyPassword } from "../services/HashPassword";

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, loading, error, updateReport } = useReports();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const report = reports.find((r) => String(r.id) === id);

  if (!report) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-muted">Report not found.</h4>
        <Link to="/mapView">← Back to map</Link>
      </Container>
    );
  }

  const statusVariant = report.status === "Lost" ? "danger" : "success";

  async function handleMarkFound() {
    if (!report) return;
    setSaving(true);
    setPwError(null);

    try {
      const match = await verifyPassword(password, report.passwordHash);
      if (!match) {
        setPwError("Incorrect password. Please try again.");
        setSaving(false);
        return;
      }

      await updateReport({ ...report, status: "Found" });
      setShowModal(false);
      setPassword("");
      navigate("/mapView");
    } catch (err) {
      setPwError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setSaving(false);
    }
  }

  const formattedDate = new Date(report.createdAt).toLocaleDateString(
    "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Link to="/mapView" className="text-muted small">
        ← Back to map
      </Link>

      <Row className="mt-4 mb-3 align-items-center">
        <Col>
          <h2 className="mb-1 fw-bold">{report.animalName}</h2>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="secondary">{report.animalType}</Badge>
            <Badge bg={statusVariant}>{report.status}</Badge>
            <span className="text-muted small">Posted {formattedDate}</span>
          </div>
        </Col>
        {report.status === "Lost" && (
          <Col xs="auto">
            <Button variant="success" onClick={() => setShowModal(true)}>
              ✓ Mark as Found
            </Button>
          </Col>
        )}
      </Row>

      <Row>
        <Col md={5} className="mb-4">
          <img
            src={report.photoUrl?.full ?? report.photoUrl?.thumb ?? ""}
            alt={report.animalName}
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: "cover",
              maxHeight: "320px",
            }}
          />
        </Col>

        <Col md={7}>
          <section className="mb-4">
            <h6 className="text-uppercase text-muted small fw-semibold mb-1">
              Description
            </h6>
            <p>{report.description}</p>
          </section>

          <section className="mb-4">
            <h6 className="text-uppercase text-muted small fw-semibold mb-1">
              Last Seen Location
            </h6>
            <p className="mb-0">{report.address}</p>
          </section>

          <section className="mb-4">
            <h6 className="text-uppercase text-muted small fw-semibold mb-1">
              Contact Information
            </h6>
            <p className="mb-0">{report.email}</p>
            <p className="mb-0">{report.phoneNum}</p>
          </section>
        </Col>
      </Row>

      {/* Mark as Found Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setPwError(null); setPassword(""); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mark as Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small">
            Enter the password you set when submitting this report to confirm
            ownership.
          </p>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMarkFound()}
              placeholder="Your report password"
              isInvalid={!!pwError}
            />
            {pwError && (
              <Form.Control.Feedback type="invalid">
                {pwError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => { setShowModal(false); setPwError(null); setPassword(""); }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleMarkFound}
            disabled={saving || !password}
          >
            {saving ? <Spinner animation="border" size="sm" /> : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}