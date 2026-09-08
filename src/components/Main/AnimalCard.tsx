import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

type AnimalCardProps = {
  id: string;
  name: string;
  type: string;
  photoUrl: string;
  status: "Lost" | "Found";
  selected?: boolean;
  onClick?: (id: string) => void;
};

export default function AnimalCard({
  id,
  name,
  type,
  photoUrl,
  status,
  selected,
  onClick,
}: AnimalCardProps) {
  const statusVariant = status === "Lost" ? "danger" : "success";

  return (
    <Card
      className={`p-2 shadow-sm mb-2 ${
        selected ? "border-primary border-3" : ""
      }`}
      style={{ maxWidth: "500px", cursor: "pointer" }}
      onClick={() => onClick?.(id)}
    >
      <Row className="align-items-center g-2">
        <Col xs="auto">
          <img
            src={photoUrl}
            alt={name}
            style={{
              width: "64px",
              height: "64px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Col>

        <Col>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div>
            <Badge bg="secondary" className="me-1">
              {type}
            </Badge>
            <Badge bg={statusVariant}>{status}</Badge>
          </div>
        </Col>

        <Col xs="auto">
          <Link
            to={`/report/${id}`}
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline-secondary btn-sm"
          >
            Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
}