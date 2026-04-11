import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  statusFilter: "Lost" | "Found" | "All";
  setStatusFilter: (value: "Lost" | "Found" | "All") => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  types: string[];
};

export default function Filters({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  types,
}: Props) {
  return (
    <Row className="g-2">
      <Col>
        <Form.Select
          size="sm"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "Lost" | "Found" | "All")
          }
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="All">All Status</option>
        </Form.Select>
      </Col>

      <Col>
        <Form.Select
          size="sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Animals</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}